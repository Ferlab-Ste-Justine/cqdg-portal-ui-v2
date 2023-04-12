import keycloak from 'auth/keycloak-api/keycloak';
import axios from 'axios';
import EnvironmentVariables from 'helpers/EnvVariables';
import { roleOptions, usageOptions } from 'views/Community/contants';

import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { sendRequest } from 'services/api';

import { TProfileImagePresignedOutput, TUser, TUserInsert, TUserUpdate } from './models';

export const USER_API_URL = `${EnvironmentVariables.configFor('USERS_API')}/user`;

export const headers = (contentType: string = 'application/json') => ({
  'Content-Type': contentType,
});

const fetch = () =>
  sendRequest<TUser>({
    method: 'GET',
    url: USER_API_URL,
    headers: headers(),
  });

const create = (body?: Omit<TUserInsert, 'keycloak_id'>) => {
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  return sendRequest<TUser>({
    method: 'POST',
    url: USER_API_URL,
    headers: headers(),
    data: {
      ...body,
      email: body?.email || tokenParsed.email || tokenParsed.identity_provider_identity,
      first_name: body?.first_name || tokenParsed.given_name,
      last_name: body?.last_name || tokenParsed.family_name,
    },
  });
};

const search = ({
  pageIndex = 0,
  pageSize = 15,
  match,
  sort,
  roles,
  dataUses,
}: {
  pageIndex?: number;
  pageSize?: number;
  match?: string;
  sort?: string;
  roles?: string;
  dataUses?: string;
}) =>
  sendRequest<{
    users: TUser[];
    total: number;
  }>({
    method: 'GET',
    url: `${USER_API_URL}/search`,
    headers: headers(),
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      match,
      sort,
      roles,
      dataUses,
      roleOptions: roleOptions.map(({ value }) => value).join(','),
      usageOptions: usageOptions.map(({ value }) => value).join(','),
    },
  });

const update = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: 'PUT',
    url: USER_API_URL,
    headers: headers(),
    data: body,
  });

const uploadImageToS3 = async (file: File | Blob) => {
  const result = await sendRequest<TProfileImagePresignedOutput>({
    method: 'GET',
    url: `${USER_API_URL}/image/presigned`,
    headers: headers(),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  await axios.request({
    method: 'PUT',
    url: result.data?.presignUrl!,
    data: file,
    headers: headers('image/jpeg'),
  });

  return result.data?.s3Key;
};

const deleteUser = () =>
  sendRequest<void>({
    method: 'DELETE',
    url: USER_API_URL,
    headers: headers(),
  });

export const UserApi = {
  search,
  fetch,
  create,
  update,
  uploadImageToS3,
  deleteUser,
};
