import Model from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr uri;
  @attr naam;
  @attr alternatieveNaam
  
  @belongsTo('bestuurseenheid-classificatie-code', {inverse: null}) classificatie;
}
