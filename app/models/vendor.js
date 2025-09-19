import Model, { attr, hasMany } from '@ember-data/model';

export default class VendorModel extends Model {
  @attr name;
  @attr uri;
  @hasMany('bestuurseenheid', {
    async: true,
    inverse: 'vendors',
    polymorphic: true,
  })
  canActOnBehalfOf;
}
