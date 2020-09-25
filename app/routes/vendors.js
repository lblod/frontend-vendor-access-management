import Route from '@ember/routing/route';

export default class VendorsRoute extends Route {

  model(params){
    return this.store.findAll('vendor')
  }
}
