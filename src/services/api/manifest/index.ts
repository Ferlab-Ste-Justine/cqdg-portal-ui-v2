import keycloak from 'auth/keycloak-api/keycloak';
import { AxiosRequestHeaders } from 'axios';
import EnvironmentVariables from 'helpers/EnvVariables';

import { sendRequest } from '../index';

import { ManifestConfig } from './models';

const MANIFEST_API = EnvironmentVariables.configFor('MANIFEST_API');

export const headers = (): AxiosRequestHeaders => ({
  'Content-Type': 'application/json',
  Accept: '*',
  Authorization: `Bearer ${keycloak.token}`,
});

const generateManifest = async (data: ManifestConfig) =>
  sendRequest<{ importUrl: string }>({
    method: 'POST',
    headers: headers(),
    data: JSON.stringify(data),
    url: `${MANIFEST_API}/manifest`,
  });

export const ManifestApi = {
  generateManifest,
};
