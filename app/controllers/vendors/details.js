import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { A } from '@ember/array';


export default class VendorsDetailsController extends Controller {
  @tracked bestuurseenhedenLijst = A([]);

  @action
  async addToList(vendor){
    (await vendor.canActOnBehalfOf).pushObjects(this.bestuurseenhedenLijst);
    await vendor.save();
    this.bestuurseenhedenLijst = A([]);
    this.send('reloadModel');
  }

  @task
  *searchBestuursType(term){
    let queryParams = {'filter[naam]': term};
    return this.store.query('bestuurseenheid', queryParams);
  }

  @action
  async appendBestuurseenheid(eenheid){
    this.bestuurseenhedenLijst.pushObject(eenheid);
  };

  @action
  removeBestuurseenheid(eenheid){
    this.bestuurseenhedenLijst = this.bestuurseenhedenLijst.without(eenheid);
  };

  @action
  copyToClipboard(key){
    navigator.clipboard.writeText(key);
  };
}
