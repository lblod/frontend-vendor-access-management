import Model, { attr, belongsTo, hasMany  } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr('string') uri;
  @attr("string") naam;
  @attr('string') alternatieveNaam;
  @belongsTo('bestuurseenheid-classificatie-code') classificatie;
  @hasMany('vendor', { inverse: "canActOnBehalfOf"} ) vendors;
}
