import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import { Typography } from 'antd';
import { IVariantEntity } from 'graphql/variants/models';
import CohortsTable from 'views/VariantEntity/Frequencies/CohortsTable';
import StudiesTable from 'views/VariantEntity/Frequencies/StudiesTable';

import styles from './index.module.scss';

const { Title } = Typography;

// const mapDispatch = (dispatch: DispatchVirtualStudies) => ({
//   onClickStudyLink: (sqons: Sqon[]) => dispatch(createQueryInCohortBuilder(sqons)),
// });
// const mapState = (state: RootState): FrequencyTabTableContainerState => ({
//   currentVirtualStudy: state.currentVirtualStudy.sqons,
// });

interface IFrequenciesProps {
  variant?: IVariantEntity;
  loading: boolean;
  id: string;
}

const Frequencies = ({ variant, loading, id }: IFrequenciesProps) => (
  <div id={id} className={styles.container}>
    <Title level={5} className={styles.title}>
      {intl.get('screen.variants.frequencies.frequencies')}
    </Title>
    <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel
        header={intl.get('screen.variants.frequencies.CQDGStudies')}
        key="1"
        className={styles.panel}
      >
        <StudiesTable loading={loading} variant={variant} />
      </CollapsePanel>
    </Collapse>
    <Collapse defaultActiveKey={['2']} className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel
        header={intl.get('screen.variants.frequencies.publicCohorts')}
        key="2"
        className={styles.panel}
      >
        <CohortsTable loading={loading} variant={variant} />
      </CollapsePanel>
    </Collapse>
  </div>
);
export default Frequencies;
