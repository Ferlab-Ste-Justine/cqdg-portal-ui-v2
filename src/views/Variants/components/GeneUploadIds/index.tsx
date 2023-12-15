import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { MatchTableItem } from '@ferlab/ui/core/components/UploadIds/types';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { INDEXES } from 'graphql/constants';
import { CHECK_GENE_MATCH_QUERY } from 'graphql/genes/queries';
import { IGeneEntity } from 'graphql/variants/models';
import EntityUploadIds from 'views/DataExploration/components/UploadIds/EntityUploadIds';

import { MAX_ITEMS_QUERY } from 'common/constants';
import { ArrangerApi } from 'services/api/arranger';

interface IGenesUploadIdsProps {
  queryBuilderId: string;
}

const GenesUploadIds = ({ queryBuilderId }: IGenesUploadIdsProps) => (
  <EntityUploadIds
    entityId="gene"
    entityIdTrans={intl.get('components.uploadIds.gene')}
    entityIdentifiers={intl.get('components.uploadIds.geneID')}
    placeHolder={intl.get('components.uploadIds.genePlaceholder')}
    fetchMatch={async (ids: string[]) => {
      const response = await ArrangerApi.graphqlRequest({
        query: CHECK_GENE_MATCH_QUERY.loc?.source.body,
        variables: {
          first: MAX_ITEMS_QUERY,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: [
              {
                ...generateValueFilter({
                  field: 'search_text',
                  value: ids,
                  index: INDEXES.GENE,
                }),
              },
            ],
          }),
        },
      });

      const genes: IGeneEntity[] = hydrateResults(response.data?.data?.Gene?.hits?.edges || []);

      return genes?.flatMap((gene) => {
        const matchedIds: string[] = ids.filter((id: string) => {
          const lowerCaseId = id.toLocaleLowerCase();
          const lowerCaseAliases = (gene.alias || []).map((alias) => alias.toLocaleLowerCase());

          return (
            gene.symbol?.toLocaleLowerCase() === lowerCaseId ||
            gene.ensembl_gene_id?.toLocaleLowerCase() === lowerCaseId ||
            lowerCaseAliases.includes(lowerCaseId)
          );
        });

        return matchedIds.map((id, index) => ({
          key: `${gene.omim_gene_id}:${index}`,
          submittedId: id,
          mappedTo: gene.symbol,
          matchTo: gene.ensembl_gene_id,
        }));
      });
    }}
    onUpload={(matches: MatchTableItem[]) => {
      const uniqueMatches = matches.filter(
        (match, index, currentMatch) =>
          index === currentMatch.findIndex((m) => m.mappedTo === match.mappedTo),
      );

      return updateActiveQueryField({
        queryBuilderId,
        field: 'genes.symbol',
        value: uniqueMatches.map((match) => match.mappedTo),
        index: INDEXES.VARIANT,
        merge_strategy: MERGE_VALUES_STRATEGIES.APPEND_VALUES,
        isUploadedList: true,
      });
    }}
  />
);

export default GenesUploadIds;
