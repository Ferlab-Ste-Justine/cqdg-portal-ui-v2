import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { LinkedinFilled, MailFilled } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Button, Col, Divider, List, Result, Row, Skeleton, Space, Typography } from 'antd';
import cx from 'classnames';

import useApi from 'hooks/useApi';
import { headers, USER_API_URL } from 'services/api/user';
import { TUser } from 'services/api/user/models';
import { useUser } from 'store/user';

import { roleOptions, usageOptions } from '../contants';

import AvatarHeader from './components/AvatarHeader';
import Banner from './components/Banner';

import styles from './index.module.scss';

const CommunityMember = () => {
  const { id } = useParams<{ id: string }>();
  const { userInfo } = useUser();

  const { loading, result } = useApi<TUser>({
    config: {
      url: `${USER_API_URL}/${id}`,
      method: 'GET',
      headers: headers(),
    },
  });

  if (!loading && !result) {
    return (
      <Result
        className={styles.notFoundMember}
        status="404"
        title="404"
        subTitle={intl.get('screen.memberProfile.notFound')}
      />
    );
  }

  const getRoleLabel = (role: string) => {
    const label = roleOptions.find(
      ({ value }) => value.toLowerCase() === role.toLowerCase(),
    )?.label;

    return label ? label : role;
  };

  const getUsageLabel = (usage: string) => {
    const label = usageOptions.find(
      ({ value }) => value.toLowerCase() === usage.toLowerCase(),
    )?.label;

    return label ? label : usage;
  };

  return (
    <div className={styles.communityMemberWrapper}>
      <div className={styles.communityMember}>
        <Banner isOwnUser={userInfo?.keycloak_id === result?.keycloak_id} />
        <div className={styles.contentWrapper}>
          <AvatarHeader user={result} isLoading={loading} />
          <Divider className={styles.divider} />
          {loading ? (
            <Skeleton
              paragraph={{
                rows: 6,
              }}
            />
          ) : (
            <Row gutter={[80, 28]}>
              <Col md={16}>
                <Row gutter={[28, 28]}>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {intl.get('screen.memberProfile.rolesTitle')}
                    </Typography.Title>
                    <List
                      className={cx(styles.infoList, !result?.roles?.length && styles.empty)}
                      itemLayout="horizontal"
                      dataSource={result?.roles ?? []}
                      renderItem={(role, index) => <li key={index}>{getRoleLabel(role)}</li>}
                      locale={{
                        emptyText: (
                          <Empty
                            showImage={false}
                            description={intl.get('screen.memberProfile.noRoles')}
                            align="left"
                            noPadding
                          />
                        ),
                      }}
                    />
                  </Col>
                  {result?.research_area && (
                    <Col span={24}>
                      <Typography.Title level={5}>
                        {intl.get('screen.memberProfile.researchAreaTitle')}
                      </Typography.Title>
                      <Typography.Text>{result?.research_area}</Typography.Text>
                    </Col>
                  )}
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {intl.get('screen.memberProfile.usageTitle')}
                    </Typography.Title>
                    <List
                      className={cx(
                        styles.infoList,
                        !result?.portal_usages?.length && styles.empty,
                      )}
                      itemLayout="horizontal"
                      dataSource={result?.portal_usages ?? []}
                      renderItem={(usage, index) => <li key={index}>{getUsageLabel(usage)}</li>}
                      locale={{
                        emptyText: (
                          <Empty
                            showImage={false}
                            description={intl.get('screen.memberProfile.noUsage')}
                            align="left"
                            noPadding
                          />
                        ),
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={8}>
                <Space direction="vertical">
                  {result?.linkedin && (
                    <Button type="text">
                      <ExternalLink style={{ color: 'unset' }} href={result?.linkedin}>
                        <Space align="center">
                          <LinkedinFilled />
                          <Typography.Text>LinkedIn</Typography.Text>
                        </Space>
                      </ExternalLink>
                    </Button>
                  )}
                  {result?.public_email && (
                    <Button type="text">
                      <ExternalLink
                        style={{ color: 'unset' }}
                        href={`mailto:${result?.public_email}`}
                      >
                        <Space align="center">
                          <MailFilled />
                          <Typography.Text>{result?.public_email}</Typography.Text>
                        </Space>
                      </ExternalLink>
                    </Button>
                  )}
                </Space>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityMember;
