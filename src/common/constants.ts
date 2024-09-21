export enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

export const ENV = {
  NODE_ENV: 'NODE_ENV',
  HOST: 'HOST',
  PORT: 'PORT',
  DB_NAME: 'DB_NAME',
  DB_USER: 'DB_USER',
  DB_HOST: 'DB_HOST',
  DB_PORT: 'DB_PORT',
  DB_PASSWORD: 'DB_PASSWORD',
  DB_LOGGING: 'DB_LOGGING',
  REDIS_HOST: 'REDIS_HOST',
  REDIS_PORT: 'REDIS_PORT',
  REDIS_PASSWORD: 'REDIS_PASSWORD',
} as const satisfies Record<string, string>;

export const ENV_DEFAULTS = {
  NODE_ENV: NodeEnv.Development,
  HOST: '0.0.0.0',
  PORT: '3000',
  DB_LOGGING: 'false',
} as const satisfies Record<string, string>;
