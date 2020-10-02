import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';


export default class BestuurseenheidToevoegenComponent extends Component {
  @service store;
  @tracked bestuurseenhedenLijst = A([])

  @action async appendBestuurseenheid(eenheid){
    console.log(eenheid)
    let targetBestuurseenheid = await this.store.peekRecord('bestuurseenheid', eenheid.id)
    this.bestuurseenhedenLijst.pushObject(targetBestuurseenheid)
    console.log(this.bestuurseenhedenLijst)
  }

}
