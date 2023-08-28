import intl from 'react-intl-universal';
import EntityDataset from '@ferlab/ui/core/pages/EntityPage/EntityDataset';
import { Typography } from 'antd';
import { ArrangerResultsTree } from 'graphql/models';
import { IDataSet } from 'graphql/studies/models';
import getDatasetDescriptions from 'views/StudyEntity/utils/getDatasetDescriptions';

import styles from './index.module.scss';

interface IStatsGraphProps {
  id: string;
  loading: boolean;
  title: string;
  datasets?: ArrangerResultsTree<IDataSet>;
}

const Datasets = ({ id, loading, title, datasets }: IStatsGraphProps) => (
  <div className={styles.container} id={id}>
    <Typography.Title className={styles.title} level={4}>
      {title}
    </Typography.Title>
    {datasets?.hits?.edges?.map(({ node: dataset }) => (
      <EntityDataset
        key={dataset?.name}
        id={id}
        descriptions={getDatasetDescriptions(dataset)}
        loading={loading}
        header={dataset?.name}
        participant_count={dataset?.participant_count || 0}
        file_count={dataset?.file_count || 0}
        dictionnary={{
          participants: intl.get('entities.participant.participants'),
          files: intl.get('entities.file.files'),
        }}
      />
    ))}
  </div>
);

export default Datasets;
