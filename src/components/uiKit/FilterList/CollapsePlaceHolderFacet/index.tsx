import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import cx from 'classnames';

import styles from './index.module.css';

interface ICollapsePlaceHolderFacetProps {
  className?: string;
  onClick?: (e: any) => void;
  title: string;
}

const CollapsePlaceHolderFacet = ({
  onClick = () => {},
  title,
  className = '',
}: ICollapsePlaceHolderFacetProps) => (
  <div onClick={onClick} className={cx(styles.collapseLikeFacet, className)}>
    <Collapse className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel collapsible="disabled" header={title} key="1"></CollapsePanel>
    </Collapse>
  </div>
);

export default CollapsePlaceHolderFacet;
