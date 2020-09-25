import Model from '@ember-data/model';

export default class VendorModel extends Model {

  @attr('string') name;
  @attr('string') key;
}
