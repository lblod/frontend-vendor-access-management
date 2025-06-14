import EmberRouter from '@ember/routing/router';
import config from 'frontend-vendor-access-management/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('mock-login');
  this.route('acmidm-login', {
    path: '/login',
  });
  this.route('acmidm-callback', {
    path: '/authorization/callback',
  });

  this.route('vendors', function () {
    this.route('details', { path: '/:id' }, function () {});
  });
});
