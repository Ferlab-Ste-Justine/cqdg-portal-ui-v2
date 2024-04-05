import { Navigate, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { REDIRECT_URI_KEY } from 'common/constants';
import { useUser } from 'store/user';
import { STATIC_ROUTES } from 'utils/routes';

type TProtectedRoute = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const { error } = useUser();
  const location = useLocation();
  const { keycloak } = useKeycloak();

  if (error) {
    return <Navigate to={STATIC_ROUTES.ERROR} />;
  }

  if (!keycloak.authenticated) {
    return (
      <Navigate
        to={`${STATIC_ROUTES.LOGIN}?${REDIRECT_URI_KEY}=${location.pathname}${location.search}`}
      />
    );
  }

  if (location.pathname === STATIC_ROUTES.LOGIN) {
    return <Navigate to={STATIC_ROUTES.STUDIES} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
