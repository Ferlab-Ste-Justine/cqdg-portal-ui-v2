import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';

export type TUser = {
  id: string;
  keycloak_id: string;
  first_name: string;
  last_name: string;
  era_commons_id?: string;
  nih_ned_id?: string;
  email?: string;
  public_email?: string;
  external_individual_fullname?: string;
  external_individual_email?: string;
  roles?: string[];
  affiliation?: string;
  research_domains?: string[];
  portal_usages?: string[];
  creation_date: Date;
  updated_date: Date;
  consent_date?: Date;
  accepted_terms: boolean;
  understand_disclaimer: boolean;
  completed_registration: boolean;
  commercial_use_reason: string;
  config: TUserConfig;
  linkedin?: string;
  profile_image_key?: string | null;
};

export type TUserTableConfig = {
  columns?: TColumnStates;
  viewPerQuery?: PaginationViewPerQuery;
};

export type TUserConfig = {
  data_exploration?: {
    tables?: {
      participants?: TUserTableConfig;
      biospecimens?: TUserTableConfig;
      datafiles?: TUserTableConfig;
    };
    summary?: {
      cards?: {
        order?: string[];
      };
    };
  };
  studies?: {
    tables?: {
      studies?: TUserTableConfig;
    };
  };
  variants?: {
    tables?: {
      variants?: TUserTableConfig;
    };
  };
  files?: {
    tables?: {
      biospecimens?: TUserTableConfig;
      files?: TUserTableConfig;
    };
  };
  participants?: {
    tables?: {
      family?: TUserTableConfig;
      diagnoses?: TUserTableConfig;
      phenotypes?: TUserTableConfig;
      biospecimens?: TUserTableConfig;
    };
  };
  dashboard?: {
    cards?: {
      order?: string[];
    };
  };
};

export type TProfileImagePresignedOutput = {
  s3Key: string;
  presignUrl: string;
};

export type TUserInsert = Omit<TUser, 'id' | 'keycloak_id' | 'creation_date' | 'update_date'>;
export type TUserUpdate = Partial<TUserInsert>;

export interface IOption {
  label: string;
  value: string;
}

export interface IUserOptions {
  roleOptions: IOption[];
  researchDomainOptions: IOption[];
}
