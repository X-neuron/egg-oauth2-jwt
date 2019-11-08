'use strict';

module.exports = {
  write: true,
  prefix: '^',
  plugin: 'autod-egg',
  test: [
    'test',
    'benchmark',
  ],
  dep: [
    'egg',
    'egg-sequelize',
    'egg-scripts',
  ],
  devdep: [
    'egg-ci',
    'egg-bin',
    'autod',
    'egg-mock',
    'eslint',
    'eslint-config-egg',
    'autod-egg',
    'factory-girl',
    'sequelize-cli',
  ],
  exclude: [
    './test/fixtures',
    './dist',
  ],
};
