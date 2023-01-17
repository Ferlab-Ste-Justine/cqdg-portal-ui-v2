export enum STATIC_ROUTES {
  HOME = '/',
  LOGIN = '/login',
  AUTH_REDIRECT = '/auth-redirect',
  DASHBOARD = '/dashboard',
  STUDIES = '/studies',
  MY_PROFILE = '/profile',
  SETTINGS = '/settings',
  COMMUNITY = '/community',
  ERROR = '/error',

  DATA_EXPLORATION = '/data-exploration',
  DATA_EXPLORATION_SUMMARY = '/data-exploration/summary',
  DATA_EXPLORATION_PARTICIPANTS = '/data-exploration/participants',
  DATA_EXPLORATION_BIOSPECIMENS = '/data-exploration/biospecimens',
  DATA_EXPLORATION_DATAFILES = '/data-exploration/datafiles',

  VARIANTS = '/variants',
  FILES = '/files',
  PARTICIPANTS = '/participants',
}

export enum DYNAMIC_ROUTES {
  DATA_EXPLORATION = '/data-exploration/:tab?',
  VARIANT_ENTITY = '/variants/:locus?',
  FILE_ENTITY = '/files/:file_id?',
  PARTICIPANT_ENTITY = '/participants/:participant_id?',
  ERROR = '/error/:status?',
}
