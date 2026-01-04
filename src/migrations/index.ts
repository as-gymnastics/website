import * as migration_20260104_170129 from './20260104_170129';

export const migrations = [
  {
    up: migration_20260104_170129.up,
    down: migration_20260104_170129.down,
    name: '20260104_170129'
  },
];
