import { ReactElement, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { TExtendedMapping } from '@ferlab/ui/core/components/filters/types';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IExtendedMappingResults } from '@ferlab/ui/core/graphql/types';
import { Space, Typography } from 'antd';
import copy from 'copy-to-clipboard';
import { useVariant } from 'graphql/variants/actions';
import { IVariantResultTree } from 'graphql/variants/models';
import { GET_VARIANT_COUNT } from 'graphql/variants/queries';
import EnvVariables from 'helpers/EnvVariables';
import get from 'lodash/get';
import {
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
  VARIANT_REPO_QB_ID,
} from 'views/Variants/utils/constants';

import { SHARED_FILTER_ID_QUERY_PARAM_KEY } from 'common/constants';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import useQBStateWithSavedFilters from 'hooks/useQBStateWithSavedFilters';
import { SavedFilterTag } from 'services/api/savedFilter/models';
import { WrapperApi } from 'services/api/wrapper';
import { globalActions } from 'store/global';
import {
  createSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
  updateSavedFilter,
} from 'store/savedFilter/thunks';
import { useSavedSet } from 'store/savedSet';
import { useUser } from 'store/user';
import { getDocLang } from 'utils/doc';
import { combineExtendedMappings } from 'utils/fieldMapper';
import { getCurrentUrl } from 'utils/helper';
import { getFacetsDictionary, getQueryBuilderDictionary } from 'utils/translation';

import VariantsTable from './VariantsTable';

import styles from './index.module.css';

const { Text, Title } = Typography;

const addTagToFilter = (filter: ISavedFilter) => ({
  ...filter,
  tag: SavedFilterTag.VariantsExplorationPage,
});

interface IPageContentProps {
  variantMapping: IExtendedMappingResults;
}

const PageContent = ({ variantMapping }: IPageContentProps) => {
  const dispatch = useDispatch<any>();
  const { userInfo } = useUser();
  const { savedSets } = useSavedSet();
  const { queryList, activeQuery, selectedSavedFilter, savedFilterList } =
    useQBStateWithSavedFilters(VARIANT_REPO_QB_ID, SavedFilterTag.VariantsExplorationPage);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: userInfo?.config.variants?.tables?.variants?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const [selectedFilterContent, setSelectedFilterContent] = useState<ReactElement>();
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  const variantResolvedSqon = resolveSyntheticSqon(queryList, activeQuery);

  const results = useVariant(
    {
      first: queryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: queryConfig.searchAfter,
      sqon: variantResolvedSqon,
      sort: tieBreaker({
        sort: queryConfig.sort,
        defaultSort: DEFAULT_SORT_QUERY,
        field: 'locus',
        order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    queryConfig.operations,
  );

  useEffect(() => {
    if (queryConfig.firstPageFlag || !queryConfig.searchAfter) {
      return;
    }

    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  useEffect(() => {
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        size: userInfo?.config.variants?.tables?.variants?.viewPerQuery || DEFAULT_PAGE_SIZE,
      },
      setQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const facetTransResolver = (key: string) => {
    const title = get(getFacetsDictionary(), key, key);
    return title
      ? title
      : combineExtendedMappings([variantMapping])?.data?.find(
          (mapping: TExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  const handleOnUpdateFilter = (filter: ISavedFilter) => dispatch(updateSavedFilter(filter));
  const handleOnSaveFilter = (filter: ISavedFilter) =>
    dispatch(createSavedFilter(addTagToFilter(filter)));
  const handleOnDeleteFilter = (id: string) => dispatch(deleteSavedFilter(id));
  const handleOnSaveAsFavorite = (filter: ISavedFilter) =>
    dispatch(setSavedFilterAsDefault(addTagToFilter(filter)));
  const handleOnShareFilter = (filter: ISavedFilter) => {
    copy(`${getCurrentUrl()}?${SHARED_FILTER_ID_QUERY_PARAM_KEY}=${filter.id}`);
    dispatch(
      globalActions.displayMessage({
        content: 'Copied share url',
        type: 'success',
      }),
    );
  };

  return (
    <Space direction="vertical" size={24} className={styles.variantsPageContent}>
      <div>
        <Title className={styles.title} level={4} data-cy="Title_Variants">
          {intl.get('screen.variants.title')}
        </Title>
        <Text className={styles.subTitle}>
          {intl.get('screen.variants.subTitle')}
          <ExternalLink
            className={styles.docExternalLink}
            hasIcon
            href={`${EnvVariables.configFor(
              'CQDG_DOCUMENTATION',
            )}/docs/fonctionnalités-générales-du-portail${getDocLang()}`}
          >
            {intl.get('layout.main.menu.documentation')}
          </ExternalLink>
        </Text>
      </div>
      <QueryBuilder
        id={VARIANT_REPO_QB_ID}
        className="variants-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: true,
          defaultTitle: intl.get('components.querybuilder.defaultTitle'),
          options: {
            enableEditTitle: true,
            enableDuplicate: true,
            enableFavoriteFilter: false,
            enableShare: true,
            enableUndoChanges: true,
          },
          selectedSavedFilter: selectedSavedFilter,
          savedFilters: savedFilterList,
          onShareFilter: handleOnShareFilter,
          onUpdateFilter: handleOnUpdateFilter,
          onSaveFilter: handleOnSaveFilter,
          onDeleteFilter: handleOnDeleteFilter,
          onSetAsFavorite: handleOnSaveAsFavorite,
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            const index = filter.content.index!;
            const field = filter.content.field;

            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={VARIANT_REPO_QB_ID}
                index={index}
                field={dotToUnderscore(field)}
                sqon={variantResolvedSqon}
                extendedMappingResults={variantMapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
          blacklistedFacets: [
            'consequences.symbol',
            'consequences.symbol_id_1',
            'locus',
            'genes.symbol',
          ],
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<LineStyleIcon width={18} height={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={results.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver, savedSets)}
        getResolvedQueryForCount={(sqon) => resolveSyntheticSqon(queryList, sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await WrapperApi.graphqlRequest<{ data: IVariantResultTree }>({
            query: GET_VARIANT_COUNT.loc?.source.body,
            variables: { sqon: resolveSyntheticSqon(queryList, sqon) },
          });
          return data?.data?.Variant?.hits?.total ?? 0;
        }}
      />
      <VariantsTable
        pageIndex={pageIndex}
        sqon={variantResolvedSqon}
        setPageIndex={setPageIndex}
        results={results}
        setQueryConfig={setQueryConfig}
        queryConfig={queryConfig}
      />
    </Space>
  );
};

export default PageContent;
