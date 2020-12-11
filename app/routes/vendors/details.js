import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class VendorsDetailsRoute extends Route {
  model(params){
    return this.store.findRecord('vendor', params.id );
  }

  @action
  reloadModel(){
      this.refresh();
  }
}
