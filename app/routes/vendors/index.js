/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class VendorsIndexRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service store;

  modelName = 'vendor';
}
