import Model, { attr, belongsTo } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr uri;
  @attr naam;
  @attr alternatieveNaam
  
}
