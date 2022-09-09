import { useDispatch } from 'react-redux';
import SortableGrid from '@ferlab/ui/core/layout/SortableGrid';
import cx from 'classnames';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { orderCardIfNeeded } from 'utils/helper';

import DataCategoryGraphCard from './DataCategoryGraphCard';
import DataTypeGraphCard from './DataTypeGraphCard';
import DemographicsGraphCard from './SociodemographicsGraphCard';
import SunburstGraphCard from './SunburstGraphCard';

import styles from './index.module.scss';

const SummaryTab = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  return (
    <SortableGrid
      onReorder={(ids) =>
        dispatch(
          updateUserConfig({
            data_exploration: {
              summary: {
                cards: {
                  order: ids,
                },
              },
            },
          }),
        )
      }
      items={orderCardIfNeeded(
        [
          {
            id: '1',
            lg: 24,
            xl: 12,
            className: styles.summaryGraphCardCol,
            component: <DemographicsGraphCard id="1" className={styles.summaryGrapCard} />,
          },
          {
            id: '2',
            lg: 24,
            xl: 12,
            className: styles.summaryGraphCardCol,
            component: (
              <SunburstGraphCard
                id="2"
                className={cx(styles.summaryGrapCard, styles.sunburstGraphCard)}
                field={'observed_phenotype_tagged'}
              />
            ),
          },
          {
            id: '3',
            lg: 24,
            xl: 12,
            className: styles.summaryGraphCardCol,
            component: (
              <SunburstGraphCard
                id="3"
                className={cx(styles.summaryGrapCard, styles.sunburstGraphCard)}
                field={'mondo'}
              />
            ),
          },
          {
            id: '4',
            lg: 24,
            xl: 12,
            className: styles.summaryGraphCardCol,
            component: <DataCategoryGraphCard id="4" className={styles.summaryGrapCard} />,
          },
          {
            id: '5',
            lg: 24,
            xl: 12,
            component: <DataTypeGraphCard id="5" className={styles.summaryGrapCard} />,
          },
        ],
        userInfo?.config.data_exploration?.summary?.cards?.order,
      )}
      gutter={[24, 24]}
    />
  );
};

export default SummaryTab;
