import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
 

export default class VendorsSubjectController extends Controller {
  @tracked page = 0
  @tracked size = 10

  @action async addBestuurseenheid(bestuurseenheid, vendor){
    let targetVendor = this.store.peekRecord('vendor', vendor.id)
    let bestuurseenheidRelation = this.store.peekRecord('bestuurseenheid', bestuurseenheid.id)
    let canActOnBehalf = await vendor.canActOnBehalfOf
    canActOnBehalf.pushObject(bestuurseenheidRelation)
    targetVendor.save()
  }

}
