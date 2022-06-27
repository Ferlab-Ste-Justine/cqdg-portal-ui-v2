import { TSortableItems } from '@ferlab/ui/core/layout/SortableGrid/SortableItem';
import cx from 'classnames';
import SavedFilters from './SavedFilters';

import styles from './index.module.scss';
import SavedSets from './SavedSets';

export interface DashboardCardProps {
  id: string;
  key?: string;
  className?: string;
}

// Important do not change the ID
// Its is used for user config
export const dashboardCards: TSortableItems[] = [
  {
    id: '3',
    xs: 24,
    md: 12,
    xxl: 8,
    className: cx(styles.cardColxxl6, styles.cardColxxl5),
    component: <SavedFilters id="3" className={styles.dashboardCard} />,
  },
  {
    id: '4',
    xs: 24,
    md: 12,
    xxl: 8,
    className: cx(styles.cardColxxl6, styles.cardColxxl5),
    component: <SavedSets id="4" className={styles.dashboardCard} />,
  },
];
