import Route from '@ember/routing/route';

export default class VendorsDetailsRoute extends Route {
  model(params){
    return this.store.findRecord('vendor',  params.id )
  }
}
