import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class VendorsDetailsIndexRoute extends Route {
  @service store;

  queryParams = {
    filter: {
      refreshModel: true,
      replace: true,
    },
    page: {
      refreshModel: true,
    },
    size: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true,
    },
  };

  model(params) {
    const query = {
      'filter[vendors][:id:]': this.modelFor('vendors/details').id,
      include: 'vendors,classificatie',
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
    };

    if (params.filter) {
      query['filter'] = params.filter;
    }

    return this.store.query('bestuurseenheid', query);
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.vendor = this.modelFor('vendors/details');
  }
}
