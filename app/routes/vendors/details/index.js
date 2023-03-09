/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class VendorsDetailsIndexRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service store;
  modelName = 'bestuurseenheid';

  mergeQueryOptions() {
    return {
      include: 'vendors',
      'filter[vendors][:id:]': this.modelFor('vendors/details').id,
    };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.vendor = this.modelFor('vendors/details');
  }
}
