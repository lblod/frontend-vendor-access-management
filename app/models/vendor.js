import Model, { attr, hasMany } from '@ember-data/model';

export default class VendorModel extends Model {
  @attr name;
  @attr uri;
  @attr key;
  @hasMany('bestuurseenheid', { async: true, inverse: null }) canActOnBehalfOf;
}
