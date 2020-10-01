import Route from '@ember/routing/route';

export default class VendorsSubjectRoute extends Route {
  model(params){
    return  Ember.RSVP.hash({
      vendor: this.store.findRecord('vendor',  params.id , { include: "can-act-on-behalf-of" }),
      bestuurseenheden: this.store.findAll('bestuurseenheid')
    })
  }
}
