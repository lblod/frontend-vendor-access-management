import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class VendorsDetailsRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('vendor', params.id);
  }
}
