import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { LinkedinFilled, MailFilled } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Button, Col, Divider, List, Result, Row, Skeleton, Space, Typography } from 'antd';
import cx from 'classnames';

import useApi from 'hooks/useApi';
import { headers, USERS_API_URL_USER } from 'services/api/user';
import { TUser } from 'services/api/user/models';
import { useUser } from 'store/user';

import AvatarHeader from './components/AvatarHeader';
import Banner from './components/Banner';

import styles from './index.module.scss';

const CommunityMember = () => {
  const { id } = useParams<{ id: string }>();
  const { userInfo } = useUser();

  const { loading, result } = useApi<TUser>({
    config: {
      url: `${USERS_API_URL_USER}/${id}`,
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

  return (
    <div className={styles.communityMemberWrapper}>
      <div className={styles.communityMember}>
        <Banner isOwnUser={userInfo?.keycloak_id === result?.keycloak_id} />
        <div className={styles.contentWrapper}>
          <AvatarHeader user={result} isLoading={loading} />
          <Divider className={styles.divider} />
          {loading ? (
            <Skeleton paragraph={{ rows: 6 }} />
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
                      renderItem={(role, index) => (
                        <li key={index}>
                          {intl.get(`screen.profileSettings.roleOptions.${role}`) || role}
                        </li>
                      )}
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
                  <Col span={24}>
                    <Typography.Title level={5}>
                      {intl.get('screen.memberProfile.researchDomainsTitle')}
                    </Typography.Title>
                    <List
                      className={cx(
                        styles.infoList,
                        !result?.research_domains?.length && styles.empty,
                      )}
                      itemLayout="horizontal"
                      dataSource={result?.research_domains || []}
                      renderItem={(research_domain, index) => (
                        <li key={index}>
                          {intl.get(
                            `screen.profileSettings.researchDomainOptions.${research_domain}`,
                          ) || research_domain}
                        </li>
                      )}
                      locale={{
                        emptyText: (
                          <Empty
                            showImage={false}
                            description={intl.get('screen.memberProfile.noResearchDomain')}
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
