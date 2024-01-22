import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { REDIRECT_URI_KEY } from 'common/constants';
import ConditionalWrapper from 'components/utils/ConditionalWrapper';
import { useUser } from 'store/user';
import { STATIC_ROUTES } from 'utils/routes';

type OwnProps = Omit<RouteProps, 'component' | 'render' | 'children'> & {
  layout?: (children: any) => React.ReactElement;
  children: React.ReactNode;
};

const ProtectedRoute = ({ children, layout, ...routeProps }: OwnProps) => {
  const { error } = useUser();
  const { keycloak } = useKeycloak();
  const RouteLayout = layout!;
  const userNeedsToLogin = !keycloak.authenticated;
  const currentPath = routeProps.path;

  if (error) {
    return <Redirect to={STATIC_ROUTES.ERROR} />;
  }

  if (userNeedsToLogin) {
    return (
      <Redirect
        to={{
          pathname: STATIC_ROUTES.LOGIN,
          search: `${REDIRECT_URI_KEY}=${routeProps.location?.pathname}${routeProps.location?.search}`,
        }}
      />
    );
  }

  if (currentPath === STATIC_ROUTES.LOGIN) {
    return <Redirect to={STATIC_ROUTES.STUDIES} />;
  }

  return (
    <ConditionalWrapper
      condition={RouteLayout !== undefined}
      wrapper={(children) => <RouteLayout>{children}</RouteLayout>}
    >
      <Route {...routeProps}>{children}</Route>
    </ConditionalWrapper>
  );
};

export default ProtectedRoute;
