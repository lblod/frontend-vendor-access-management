import Model, { attr, belongsTo } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr('string') uri;
  @attr("string") naam;
  @attr('string') alternatieveNaam;
  @belongsTo('bestuurseenheid-classificatie-code') classificatie;
}
