import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

interface OwnProps {
  className?: string;
  to: string | string[];
  title: string;
  icon?: React.ReactElement;
}

const HeaderLink = ({ className = '', to, icon, title }: OwnProps) => (
  <Link to={to instanceof Array ? to[0] : to}>
    <Button className={className} icon={icon}>
      {title}
    </Button>
  </Link>
);

export default HeaderLink;
