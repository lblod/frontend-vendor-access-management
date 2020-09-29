import Model, { attr } from '@ember-data/model';

export default class BestuurseeheidClassificatieCodeModel extends Model {
  @attr('string') label;
  @attr('string') scopeNote;
}
