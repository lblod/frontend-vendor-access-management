import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';

 

export default class VendorsSubjectController extends Controller {
  @tracked sort = "name"
  @tracked page = 0
  @tracked size = 10
  @tracked bestuurseenhedenLijst = A([])

  @action async patchVendor(bestuurseenheid, vendor, todo){
    // Get vendor, bestuurseenheid & relationship array
    let targetVendor = this.store.peekRecord('vendor', vendor.id)

    let relationship = await targetVendor.canActOnBehalfOf

    // Action to be performed based on argument
    if (todo == "delete"){
      let targetBestuurseenheid = this.store.peekRecord('bestuurseenheid', bestuurseenheid.id)
      relationship.removeObject(targetBestuurseenheid)
    }

    if (todo == "add") {
      relationship.pushObjects(this.bestuurseenhedenLijst)
    }
    
    // PATCH /
    targetVendor.save()
  }

  @(task(function* (term) {
    // yield timeout(250);
    let queryParams = {'filter[naam]': term};
    return this.store.query('bestuurseenheid', queryParams);
  })) searchBestuursType;

  @action async appendBestuurseenheid(eenheid){
    let targetBestuurseenheid = await this.store.peekRecord('bestuurseenheid', eenheid.id)
    this.bestuurseenhedenLijst.pushObject(targetBestuurseenheid)
  }



}
