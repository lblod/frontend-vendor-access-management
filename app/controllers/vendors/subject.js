import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
 

export default class VendorsSubjectController extends Controller {
  @tracked sort = "name"
  @tracked page = 0
  @tracked size = 10

  @action async patchVendor(bestuurseenheid, vendor, todo){
    // Get vendor, bestuurseenheid & relationship array
    let targetVendor = this.store.peekRecord('vendor', vendor.id)
    let targetBestuurseenheid = this.store.peekRecord('bestuurseenheid', bestuurseenheid.id)
    let relationship = await vendor.canActOnBehalfOf

    // Action to be performed based on argument
    if (todo == "delete"){
      relationship.removeObject(targetBestuurseenheid)
    }

    if (todo == "add") {
      relationship.pushObject(targetBestuurseenheid)
    }

    // PATCH /
    targetVendor.save()
  }

  @(task(function* (term) {
    // yield timeout(250);
    let queryParams = {'filter[naam]': term};
    return this.store.query('bestuurseenheid', queryParams);
  })) searchBestuursType;

}
