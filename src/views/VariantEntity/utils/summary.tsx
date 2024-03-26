import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { pickImpactBadge } from '@ferlab/ui/core/components/Consequences/Cell';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import CanonicalIcon from '@ferlab/ui/core/components/Icons/CanonicalIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IArrangerEdge } from '@ferlab/ui/core/graphql/types';
import { toExponentialNotation } from '@ferlab/ui/core/utils/numberUtils';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Popover, Space, Tag, Tooltip, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IClinVar, IGeneOmim, IVariantEntity } from 'graphql/variants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { ClinvarColorMap } from 'views/Variants/components/PageContent/VariantsTable/utils';

import { STATIC_ROUTES } from 'utils/routes';

import style from '../index.module.scss';

const { Text } = Typography;

const renderClinvar = (clinVar: IClinVar) => {
  const clinVarSigKey: string[] = [];

  clinVar?.clin_sig &&
    clinVar.clin_sig.map((c) => {
      clinVarSigKey.push(c.toLowerCase());
    });

  return clinVar?.clin_sig && clinVar.clinvar_id
    ? clinVarSigKey.map((clinvarKey, index) => (
        <Tag color={ClinvarColorMap[clinvarKey]} key={index}>
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
          >
            <Text className={style.clinVar}>
              {intl.get(`entities.variant.pathogenicity.clinVarLabel.${clinvarKey}`)}
            </Text>
          </ExternalLink>
        </Tag>
      ))
    : TABLE_EMPTY_PLACE_HOLDER;
};

const renderParticipantsFrequency = (variant: IVariantEntity) =>
  variant.internal_frequencies_wgs?.total?.pf && (
    <Text className={style.frequency}>
      ({toExponentialNotation(variant.internal_frequencies_wgs.total.pf)})
    </Text>
  );

const renderParticipants = (variant: IVariantEntity) => {
  const totalNbOfParticipants = variant.internal_frequencies_wgs?.total?.pc || 0;
  const totalParticipants = variant.internal_frequencies_wgs?.total?.pn || 0;
  const studies = variant.studies;
  const participantIds =
    studies?.hits?.edges?.map((study) => study.node.participant_ids || [])?.flat() || [];

  if (!participantIds.length) {
    return (
      <div className={style.participants}>
        {totalNbOfParticipants} / {numberFormat(totalParticipants)}
        {renderParticipantsFrequency(variant)}
      </div>
    );
  }
  return (
    <div className={style.participants}>
      {participantIds.length > 10 ? (
        <>
          <Link
            to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
            onClick={() => {
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'participant_id',
                      value: participantIds,
                      index: INDEXES.PARTICIPANT,
                    }),
                  ],
                }),
                setAsActive: true,
              });
            }}
          >
            {numberFormat(totalNbOfParticipants)}
          </Link>
          <Text> / {numberFormat(totalParticipants)}</Text>
        </>
      ) : (
        <Text>
          {numberFormat(totalNbOfParticipants)} / {numberFormat(totalParticipants)}
        </Text>
      )}
      {renderParticipantsFrequency(variant)}
    </div>
  );
};

const renderOmim = (pickedOmim: IArrangerEdge<IGeneOmim>[]) => {
  if (!pickedOmim.length) return [{ label: undefined, value: <>{TABLE_EMPTY_PLACE_HOLDER}</> }];

  return pickedOmim.map((omim) => ({
    label: undefined,
    value: (
      <Space size={4}>
        <ExternalLink href={`https://www.omim.org/entry/${omim.node.omim_id}`}>
          {omim.node.name}
        </ExternalLink>
        {omim.node.inheritance_code?.length > 0 &&
          omim.node.inheritance_code.map((code) => (
            <Tooltip key={code} title={intl.get(`entities.variant.table.inheritant.code.${code}`)}>
              <Tag color="blue">{code}</Tag>
            </Tooltip>
          ))}
      </Space>
    ),
  }));
};

export const getSummaryItems = (variant?: IVariantEntity) => {
  const geneWithPickedConsequence = variant?.genes?.hits?.edges?.find((e) =>
    (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
  )?.node;

  const consequences = geneWithPickedConsequence?.consequences?.hits?.edges;
  const pickedCons = consequences?.find((c) => c.node.picked);

  if (!geneWithPickedConsequence || !consequences || !pickedCons) return undefined;

  const pickedOmim = geneWithPickedConsequence.omim?.hits?.edges || [];

  return {
    banner: [
      {
        label: (
          <>
            <ExternalLink
              className={style.symbolLink}
              href={
                geneWithPickedConsequence.omim_gene_id
                  ? `https://omim.org/entry/${geneWithPickedConsequence.omim_gene_id}`
                  : // eslint-disable-next-line max-len
                    `https://www.omim.org/search?index=entry&start=1&limit=10&sort=score+desc%2C+prefix_sort+desc&search=${geneWithPickedConsequence.symbol}`
              }
            >
              <Text>{geneWithPickedConsequence.symbol}</Text>
            </ExternalLink>
            (
            <ExternalLink
              className={style.ensemblLink}
              href={`https://www.ensembl.org/id/${pickedCons.node.ensembl_transcript_id}`}
            >
              {intl.get('entities.variant.ensembl')}
            </ExternalLink>
            )
          </>
        ),
        value: pickedCons.node.aa_change || TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        label: intl.get('entities.variant.consequences.consequence'),
        value: (
          <>
            {pickImpactBadge(pickedCons.node.vep_impact, 14, 14)}
            <Text className={style.summaryConsequence}>
              {removeUnderscoreAndCapitalize(pickedCons.node.consequence[0])}
            </Text>
          </>
        ),
      },
      {
        label: intl.get('entities.variant.pathogenicity.clinVar'),
        value: renderClinvar(variant.clinvar),
      },
      {
        label: (
          <>
            {intl.get('entities.participant.participants')}
            <Tooltip
              arrowPointAtCenter
              placement="topLeft"
              title={intl.get('entities.variant.participant.tooltip')}
            >
              <InfoCircleOutlined className={style.tooltipIcon} />
            </Tooltip>
          </>
        ),
        value: renderParticipants(variant),
      },
      {
        label: (
          <>
            {intl.get('entities.variant.gnomAD')}
            <Tooltip
              arrowPointAtCenter
              placement="topLeft"
              title={intl.get('entities.variant.gnomADTooltip')}
            >
              <InfoCircleOutlined className={style.tooltipIcon} />
            </Tooltip>
          </>
        ),
        value: variant.external_frequencies?.gnomad_genomes_3?.af ? (
          <ExternalLink
            className={style.gnomad}
            href={`https://gnomad.broadinstitute.org/variant/${variant.locus}?dataset=gnomad_r3`}
          >
            {toExponentialNotation(variant.external_frequencies.gnomad_genomes_3.af)}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
      },
    ],
    info: [
      <Space key="0" direction="horizontal">
        <ExternalLink href={`https://www.ensembl.org/id/${pickedCons.node.ensembl_transcript_id}`}>
          {pickedCons.node.ensembl_transcript_id}
        </ExternalLink>
        {pickedCons.node.canonical && (
          <Tooltip title={intl.get('entities.variant.consequences.canonical')}>
            <div>
              <CanonicalIcon className={style.canonicalIcon} height={16} width={16} />
            </div>
          </Tooltip>
        )}
      </Space>,
      pickedCons.node.refseq_mrna_id?.length > 0 &&
      //need to check first value not null because we have this type of data [null]
      pickedCons.node.refseq_mrna_id[0] ? (
        <div key="1">
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/nuccore/${pickedCons.node.refseq_mrna_id[0]}?report=graph`}
          >
            {pickedCons.node.refseq_mrna_id[0]}
          </ExternalLink>
          {pickedCons.node.refseq_mrna_id.length > 1 && (
            <Popover
              overlayClassName={style.popOverContent}
              placement="bottom"
              title={intl.get('entities.variant.consequences.seeMoreRefSeq', {
                ensemblTranscriptId: pickedCons.node.ensembl_transcript_id,
              })}
              content={
                <Space direction="vertical">
                  {pickedCons.node.refseq_mrna_id.map((id: string, index: number) => {
                    if (index === 0) return;
                    return (
                      <ExternalLink
                        href={`https://www.ncbi.nlm.nih.gov/nuccore/${id}?report=graph`}
                        key={index}
                      >
                        {id}
                      </ExternalLink>
                    );
                  })}
                </Space>
              }
            >
              <Button className={style.seeMore} type="link">
                {intl.get('global.seeMore')}
              </Button>
            </Popover>
          )}
        </div>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
      <Text key="3">{pickedCons?.node?.coding_dna_change || TABLE_EMPTY_PLACE_HOLDER}</Text>,
      <div key="4">
        {variant.rsnumber ? (
          <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${variant.rsnumber}`}>
            {variant.rsnumber}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        )}
      </div>,
    ],
    details: {
      leftSection: {
        title: (
          <Text className={style.functionalScores}>
            {intl.get('entities.variant.details.functionalScores')}
          </Text>
        ),
        items: [
          {
            label: intl.get('entities.variant.details.sift'),
            value: pickedCons.node.predictions?.sift_pred ? (
              <>
                <Text className={style.predictionLabel}>
                  {intl.get(
                    `filters.options.consequences.predictions.sift_pred.${pickedCons.node.predictions.sift_pred}`,
                  )}
                </Text>
                ({pickedCons.node.predictions.sift_score})
              </>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          },
          {
            label: intl.get('entities.variant.details.fathmm'),
            value: pickedCons.node.predictions?.fathmm_pred ? (
              <>
                <Text className={style.predictionLabel}>
                  {' '}
                  {intl.get(
                    `facets.options.genes__consequences__predictions__fathmm_pred.${pickedCons.node.predictions.fathmm_pred}`,
                  )}
                </Text>
                ({pickedCons.node.predictions.fathmm_score})
              </>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          },
          {
            label: intl.get('entities.variant.details.caddRaw'),
            value: pickedCons.node.predictions?.cadd_score || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.details.caddPhred'),
            value: pickedCons.node.predictions?.cadd_phred || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.details.dann'),
            value: pickedCons.node.predictions?.dann_score || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.details.lrt'),
            value: pickedCons.node.predictions?.lrt_pred ? (
              <>
                <Text className={style.predictionLabel}>
                  {intl.get(
                    `facets.options.genes__consequences__predictions__lrt_pred.${pickedCons.node.predictions.lrt_pred}`,
                  )}
                </Text>
                ({pickedCons.node.predictions.lrt_score})
              </>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          },
          {
            label: intl.get('entities.variant.details.revel'),
            value: pickedCons.node.predictions?.revel_score || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.details.polyphen2hvar'),
            value: pickedCons.node.predictions?.polyphen2_hvar_pred ? (
              <>
                <Text className={style.predictionLabel}>
                  {intl.get(
                    // eslint-disable-next-line max-len
                    `facets.options.genes__consequences__predictions__polyphen2_hvar_pred.${pickedCons.node.predictions.polyphen2_hvar_pred}`,
                  )}{' '}
                </Text>
                ({pickedCons.node.predictions.polyphen2_hvar_score})
              </>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          },
          {
            label: intl.get('entities.variant.details.phyloP17Way'),
            value: pickedCons.node.conservations?.phyloP17way_primate || TABLE_EMPTY_PLACE_HOLDER,
          },
        ],
      },
      middleSection: [
        {
          title: intl.get('entities.variant.details.geneConstraints'),
          items: [
            {
              label: intl.get('entities.variant.details.pli'),
              value: geneWithPickedConsequence.gnomad?.pli || TABLE_EMPTY_PLACE_HOLDER,
            },
            {
              label: intl.get('entities.variant.details.loeuf'),
              value: geneWithPickedConsequence.gnomad?.loeuf || TABLE_EMPTY_PLACE_HOLDER,
            },
          ],
        },
        {
          title: intl.get('entities.variant.details.spliceAltering'),
          items: [
            {
              label: intl.get('entities.variant.details.spliceAi'),
              value: geneWithPickedConsequence.spliceai?.ds ? (
                <>
                  <Text className={style.spliceAi}>{geneWithPickedConsequence.spliceai.ds}</Text>
                  {geneWithPickedConsequence.spliceai.type.map((t: string, index: number) => (
                    <Tooltip
                      key={index}
                      title={intl.get(`entities.variant.details.spliceAiType.${t}`)}
                    >
                      <Tag>{t}</Tag>
                    </Tooltip>
                  ))}
                </>
              ) : (
                TABLE_EMPTY_PLACE_HOLDER
              ),
            },
          ],
        },
      ],
      rightSection: {
        title: intl.get('entities.variant.details.associatedConditions'),
        items: renderOmim(pickedOmim),
      },
    },
  };
};
