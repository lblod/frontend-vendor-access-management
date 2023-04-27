import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { service } from '@ember/service';
import { VIEW_ONLY_MODES } from '/utils/constants';

export default class BestuurseenheidModel extends Model {
  @service intl;

  @attr uri;
  @attr naam;
  @attr alternatieveNaam;
  @attr viewOnlyModules;

  @belongsTo('bestuurseenheid-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;

  @hasMany('vendor', {
    async: true,
    inverse: 'canActOnBehalfOf',
    as: 'bestuurseenheid',
  })
  vendors;

  get hasViewOnlyModules() {
    return this.viewOnlyModules && this.viewOnlyModules.length > 0;
  }

  get formattedViewOnlyModules() {
    if (this.viewOnlyModules)
      return this.viewOnlyModules
        .map((value) => {
          for (const key in VIEW_ONLY_MODES)
            if (VIEW_ONLY_MODES[key] === value) return key;
        })
        .map((key) => this.intl.t('vendor.subject.modules.' + key))
        .join(', ');
    else return '';
  }
}
