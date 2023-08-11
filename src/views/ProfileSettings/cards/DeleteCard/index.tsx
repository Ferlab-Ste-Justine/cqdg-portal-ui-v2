import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Modal, Typography } from 'antd';

import { deleteUser } from 'store/user/thunks';

const { Text, Title } = Typography;
const { confirm } = Modal;

const DeleteCard = () => {
  const dispatch = useDispatch();

  const showConfirm = () => {
    confirm({
      title: intl.get('screen.profileSettings.cards.deleteAccount.title'),
      icon: <ExclamationCircleOutlined />,
      content: intl.get('screen.profileSettings.cards.deleteAccount.confirm.content'),
      okText: intl.get('global.delete'),
      cancelText: intl.get('global.cancel'),
      okButtonProps: {
        danger: true,
        type: 'primary',
      },
      onOk: () => dispatch(deleteUser()),
    });
  };

  return (
    <GridCard
      title={
        <Title level={4}>{intl.get('screen.profileSettings.cards.deleteAccount.title')}</Title>
      }
      footer={
        <Button type="primary" danger onClick={showConfirm}>
          {intl.get('screen.profileSettings.cards.deleteAccount.button')}
        </Button>
      }
      content={<Text>{intl.get('screen.profileSettings.cards.deleteAccount.notice')}</Text>}
    />
  );
};

export default DeleteCard;
