import Component from '@glimmer/component';

import { action } from '@ember/object';


export default class BestuurseenheidToevoegenComponent extends Component {

  @action debug(){
    console.log("debug")
  }

}
