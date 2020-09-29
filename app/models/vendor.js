import Model, { attr, hasMany } from '@ember-data/model';

export default class VendorModel extends Model {
  @attr('string') name;
  @attr('string') uri;
  @attr('string') key;
  @hasMany('bestuurseenheid') canActOnBehalf;
}
