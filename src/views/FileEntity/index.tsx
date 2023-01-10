import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import AnchorMenu, { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import Empty from '@ferlab/ui/core/components/Empty';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Typography } from 'antd';
import { useFile } from 'graphql/files/actions';
import Analysis from 'views/FileEntity/Analysis';
import AnalysisFiles from 'views/FileEntity/AnalysisFiles';
import Biospecimens from 'views/FileEntity/Biospecimens';
import DataType from 'views/FileEntity/DataType';
import ExperimentalProcedure from 'views/FileEntity/ExperimentalProcedure';
import Summary from 'views/FileEntity/Summary';

import styles from './index.module.scss';

const { Title } = Typography;

const FileEntity = () => {
  const { file_id } = useParams<{ file_id: string }>();

  const { data, loading } = useFile({
    field: 'file_id',
    values: [file_id],
  });

  const SUMMARY = 'SUMMARY';
  const DATATYPE = 'DATATYPE';
  const BIOSPECIMENS = 'BIOSPECIMENS';
  const EXPERIMENTALPROCEDURE = 'EXPERIMENTALPROCEDURE';
  const ANALYSIS = 'ANALYSIS';
  const ANALYSISFILES = 'ANALYSISFILES';

  const links: IAnchorLink[] = [
    { href: `#${SUMMARY}`, title: intl.get('entities.file.summary') },
    { href: `#${DATATYPE}`, title: intl.get('entities.file.dataType') },
    { href: `#${BIOSPECIMENS}`, title: intl.get('entities.file.participantsSamples') },
    { href: `#${EXPERIMENTALPROCEDURE}`, title: intl.get('entities.file.experimentalProcedure') },
    { href: `#${ANALYSIS}`, title: intl.get('entities.file.analysis') },
    { href: `#${ANALYSISFILES}`, title: intl.get('entities.file.analysisFiles') },
  ];

  /** Enable AnchorMenu with simple-bar lib used by ScrollContent -> add id to good wrapper div */
  const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');
  const scrollContainerId = 'variant-entity-scroll-wrapper';
  simplebarContent[1] && simplebarContent[1].setAttribute('id', scrollContainerId);

  if (!data && !loading) {
    return <Empty imageType="row" size="large" description={intl.get('no.data.available')} />;
  }

  return (
    <div className={styles.variantEntityContainer}>
      <ScrollContent className={styles.scrollContent} key={scrollContainerId}>
        {data && (
          <div className={styles.titleHeader}>
            <FileTextOutlined />
            <Title level={4} className={styles.title}>
              {data?.file_id}
            </Title>
          </div>
        )}
        <Summary id={SUMMARY} file={data} loading={loading} />
        <DataType id={DATATYPE} file={data} loading={loading} />
        <Biospecimens id={BIOSPECIMENS} file={data} loading={loading} />
        <ExperimentalProcedure id={EXPERIMENTALPROCEDURE} file={data} loading={loading} />
        <Analysis id={ANALYSIS} file={data} loading={loading} />
        <AnalysisFiles id={ANALYSISFILES} file={data} loading={loading} />
      </ScrollContent>
      <AnchorMenu
        scrollContainerId={scrollContainerId}
        links={links}
        className={styles.anchorMenu}
      />
    </div>
  );
};

export default FileEntity;
