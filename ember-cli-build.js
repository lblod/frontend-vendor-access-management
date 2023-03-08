'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    '@appuniversum/ember-appuniversum': {
      disableWormholeElement: true,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const { Webpack } = require('@embroider/webpack');

  // The built-in compat adapters for Ember Data shouldn't be needed anymore.
  // This code can be removed once https://github.com/embroider-build/embroider/pull/1369 is released.
  const compatAdapters = new Map();
  compatAdapters.set('ember-data', null);
  compatAdapters.set('@ember-data/adapter', null);
  compatAdapters.set('@ember-data/model', null);
  compatAdapters.set('@ember-data/record-data', null);
  compatAdapters.set('@ember-data/store', null);

  return require('@embroider/compat').compatBuild(app, Webpack, {
    //
    // staticAddonTestSupportTrees: true,
    // staticAddonTrees: true,
    // staticHelpers: true,
    // staticModifiers: true,
    // staticComponents: true,
    // splitAtRoutes: ['route.name'], // can also be a RegExp
    // packagerOptions: {
    //    webpackConfig: { }
    // }
    //

    packageRules: [{ '@ember-data/store': null }],
    compatAdapters,
    extraPublicTrees: [],
  });
};
