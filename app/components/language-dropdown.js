import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LanguageDropdownComponent extends Component {
  @service("intl") intl;

  @action
  changeLanguage(lang){
    console.log(this.intl.set("locale", lang));

  }
}
