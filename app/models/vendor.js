import Model, { attr } from '@ember-data/model';

export default class VendorModel extends Model {
  @attr('string') name;
  @attr('string') uri;
  @attr('string') key;
}
