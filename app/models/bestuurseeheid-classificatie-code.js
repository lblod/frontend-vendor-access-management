import Model from '@ember-data/model';

export default class BestuurseeheidClassificatieCodeModel extends Model {
  @attr('string') uri;
  @attr('string') label;
  @attr('string') scopeNote;
}
