import EmberRouter from '@ember/routing/router';
import config from 'frontend-vendor-access-management/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('vendors', function () {
    this.route('details', { path: '/:id' }, function () {});
  });
  this.route('login');
});
