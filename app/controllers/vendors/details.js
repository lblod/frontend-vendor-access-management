import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';

import { loadAllBestuurseenheidenForVendor } from 'frontend-vendor-access-management/utils/load-relation-utils';

export default class VendorsDetailsController extends Controller {
  @tracked bestuurseenhedenLijst = [];

  @action
  async addToList(vendor){
    const allEenheden = await loadAllBestuurseenheidenForVendor(this.store, vendor);
    const updatedEenheden = [ ...allEenheden, ...this.bestuurseenhedenLijst];
    (await vendor.canActOnBehalfOf).setObjects(updatedEenheden);
    await vendor.save();
    this.bestuurseenhedenLijst = [];
    this.send('reloadModel');
  }

  @task
  *searchBestuursType(term){
    let queryParams = {'filter[naam]': term};
    yield
    return this.store.query('bestuurseenheid', queryParams);
  }

  @action
  async appendBestuurseenheid(eenheid){
    this.bestuurseenhedenLijst.pushObject(eenheid);
  }

  @action
  removeBestuurseenheid(eenheid){
    this.bestuurseenhedenLijst = this.bestuurseenhedenLijst.without(eenheid);
  }

  @action
  copyToClipboard(key){
    navigator.clipboard.writeText(key);
  }
}
