import Route from '@ember/routing/route';

export default class VendorsSubjectRoute extends Route {
  model(params){
    return this.store.findRecord('vendor',  params.id ,{ include: "can-act-on-behalf" }
    )
  }
}
