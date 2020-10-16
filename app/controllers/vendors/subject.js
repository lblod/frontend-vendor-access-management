import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { A } from '@ember/array';

export default class VendorsSubjectController extends Controller {
  page = 0;
  size = 20;
  @tracked bestuurseenhedenLijst = A([]);



  @task
  *searchBestuursType(term){
    let queryParams = {'filter[naam]': term};
    return this.store.query('bestuurseenheid', queryParams);
  }

  @action
  async appendBestuurseenheid(eenheid){
    let targetBestuurseenheid = await this.store.peekRecord('bestuurseenheid', eenheid.id);
    this.bestuurseenhedenLijst.pushObject(targetBestuurseenheid);
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
