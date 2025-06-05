import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class VendorsIndexRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };

  model(params) {
    return this.store.query('vendor', {
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    });
  }

  @action
  loading(transition) {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    const controller = this.controllerFor(this.routeName);
    controller.set('isLoading', true);
    transition.promise.finally(function () {
      controller.set('isLoading', false);
    });
    return true; // bubble the loading event
  }
}
