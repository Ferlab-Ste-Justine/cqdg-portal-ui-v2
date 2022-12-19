import { ReactElement, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { Space, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { IVariantResultTree } from 'graphql/variants/models';
import { GET_VARIANTS_COUNT } from 'graphql/variants/queries';
import isEmpty from 'lodash/isEmpty';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  VARIANT_FILTER_TAG,
  VARIANT_REPO_QB_ID,
} from 'views/Variants/utils/constant';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import { ArrangerApi } from 'services/api/arranger';
import { useSavedFilter } from 'store/savedFilter';
import {
  createSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
  updateSavedFilter,
} from 'store/savedFilter/thunks';
import { combineExtendedMappings } from 'utils/fieldMapper';
import { getQueryBuilderDictionary } from 'utils/translation';

import Variants from './Variants';

import styles from './index.module.scss';

const { Title } = Typography;

type OwnProps = {
  variantMapping: ExtendedMappingResults;
};

const addTagToFilter = (filter: ISavedFilter) => ({
  ...filter,
  tag: VARIANT_FILTER_TAG,
});

const PageContent = ({ variantMapping }: OwnProps) => {
  const dispatch = useDispatch();
  const { queryList, activeQuery } = useQueryBuilderState(VARIANT_REPO_QB_ID);
  const { savedFilters, defaultFilter } = useSavedFilter(VARIANT_FILTER_TAG);

  const [selectedFilterContent, setSelectedFilterContent] = useState<ReactElement | undefined>(
    undefined,
  );

  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const variantResolvedSqon = resolveSyntheticSqon(queryList, activeQuery);

  const variantResults = useVariants({
    first: variantQueryConfig.size,
    offset: variantQueryConfig.size * (variantQueryConfig.pageIndex - 1),
    sqon: variantResolvedSqon,
    sort: isEmpty(variantQueryConfig.sort)
      ? [{ field: 'variant_class', order: 'asc' }]
      : variantQueryConfig.sort,
  });

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const facetTransResolver = (key: string) => {
    const title = intl.get(`facets.${key}`);
    return title
      ? title
      : combineExtendedMappings([variantMapping])?.data?.find(
          (mapping: ExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  const handleOnUpdateFilter = (filter: ISavedFilter) => dispatch(updateSavedFilter(filter));
  const handleOnSaveFilter = (filter: ISavedFilter) =>
    dispatch(createSavedFilter(addTagToFilter(filter)));
  const handleOnDeleteFilter = (id: string) => dispatch(deleteSavedFilter(id));
  const handleOnSaveAsFavorite = (filter: ISavedFilter) =>
    dispatch(setSavedFilterAsDefault(addTagToFilter(filter)));

  return (
    <Space direction="vertical" size={24} className={styles.variantsPageContent}>
      <Title level={4} className={styles.variantsTitle}>
        {intl.get('screen.variants.title')}
      </Title>
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
          },
          selectedSavedFilter: defaultFilter,
          savedFilters: savedFilters,
          onUpdateFilter: handleOnUpdateFilter,
          onSaveFilter: handleOnSaveFilter,
          onDeleteFilter: handleOnDeleteFilter,
          onSetAsFavorite: handleOnSaveAsFavorite,
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<LineStyleIcon width={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={variantResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver)}
        getResolvedQueryForCount={(sqon) => resolveSyntheticSqon(queryList, sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IVariantResultTree }>({
            query: GET_VARIANTS_COUNT.loc?.source.body,
            variables: {
              sqon: resolveSyntheticSqon(queryList, sqon),
            },
          });
          return data?.data?.Variant.hits.total ?? 0;
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={VARIANT_REPO_QB_ID}
                index={INDEXES.VARIANT}
                field={dotToUnderscore(filter.content.field)}
                sqon={variantResolvedSqon}
                extendedMappingResults={variantMapping}
              />,
            );
          },
          selectedFilterContent,
        }}
      />
      <Variants
        results={variantResults}
        setQueryConfig={setVariantQueryConfig}
        queryConfig={variantQueryConfig}
      />
    </Space>
  );
};

export default PageContent;
