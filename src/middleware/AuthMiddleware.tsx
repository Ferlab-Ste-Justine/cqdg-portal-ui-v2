import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import Spinner from 'components/uiKit/Spinner';
import { useUser } from 'store/user';
import { userActions } from 'store/user/slice';
import { useSavedFilter } from 'store/savedFilter';
import useQueryParams from 'hooks/useQueryParams';
import { SHARED_FILTER_ID_QUERY_PARAM_KEY } from 'common/constants';

type Props = {
  children: React.ReactElement;
};

const AuthMiddleware = ({ children }: Props) => {
  const { isLoading } = useUser();
  const { isLoading: isSavedFilterLoading } = useSavedFilter();
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const params = useQueryParams();

  useEffect(() => {
    const sharedFilterId = params.get(SHARED_FILTER_ID_QUERY_PARAM_KEY);
    if (sharedFilterId) {
      //dispatch(fetchSharedSavedFilter(sharedFilterId));
    }
    // eslint-disable-next-line
    dispatch(userActions.setIsUserLoading(false));
  }, []);

  useEffect(() => {
    if (keycloak.authenticated) {
      // TODO Uncomment when the new user-api is done and connected
      //dispatch(fetchUser());
      //dispatch(fetchSavedFilters());
      //dispatch(fetchSavedSet());
    } else {
      dispatch(userActions.setIsUserLoading(false));
    }
    // eslint-disable-next-line
  }, [keycloak]);

  return isLoading || isSavedFilterLoading ? <Spinner size={'large'} /> : children;
};

export default AuthMiddleware;
