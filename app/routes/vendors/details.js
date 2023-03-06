import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VendorsDetailsRoute extends Route {
  @service store;

  model(params) {
    return this.store.findRecord('vendor', params.id);
  }

  @action
  reloadModel() {
    this.refresh();
  }
}
