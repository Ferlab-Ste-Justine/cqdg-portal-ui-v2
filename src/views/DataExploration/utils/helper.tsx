import { Typography } from 'antd';

const { Text } = Typography;

const titleAndCodeExtractor = (
  value: string,
  codeSubstring: string,
): { title: string; code: string } => {
  if (!value) {
    return {
      title: '',
      code: '',
    };
  }
  const indexCode = value.indexOf(codeSubstring);

  return {
    title: value.substring(0, indexCode).trim(),
    code: value.substring(indexCode + codeSubstring.length, value.length - 1),
  };
};

// Format is like: Sleep apnea (MONDO:0010535)
export const extractMondoTitleAndCode = (mondo: string) => titleAndCodeExtractor(mondo, '(MONDO:');

export const formatMondoTitleAndCode = (mondo: string) => {
  const mondoInfo = extractMondoTitleAndCode(mondo);
  return (
    <Text>
      {mondoInfo?.title} <Text style={{ fontSize: '12px' }}>(MONDO:{mondoInfo?.code})</Text>
    </Text>
  );
};

// Format is like: Alzheimer disease (HP:0002511)
export const extractPhenotypeTitleAndCode = (phenotype: string) =>
  titleAndCodeExtractor(phenotype, '(HP:');

export const formatHpoTitleAndCode = (phenotype: string) => {
  const phenotypeInfo = extractPhenotypeTitleAndCode(phenotype);
  return (
    <Text>
      {phenotypeInfo?.title} <Text style={{ fontSize: '12px' }}>(HP:{phenotypeInfo?.code})</Text>
    </Text>
  );
};

// Format is like: Feces (NCIT:C13234)
export const extractNcitTissueTitleAndCode = (ncit: string) =>
  titleAndCodeExtractor(ncit, '(NCIT:');

// Format is like: General (DUO:0000042)
export const extractDuoTitleAndCode = (duo: string) => titleAndCodeExtractor(duo, '(DUO:');
