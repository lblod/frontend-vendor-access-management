import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class LanguageDropdownComponent extends Component {
  @service intl;

  supportedLanguages = {
    'en-us': 'English',
    'nl-be': 'Nederlands',
  };

  languageLabel = (language) => {
    return this.supportedLanguages[language];
  };

  isActiveLanguage = (language) => {
    return language === this.intl.primaryLocale;
  };

  @action
  changeLanguage(lang) {
    this.intl.set('locale', lang);
  }
}
