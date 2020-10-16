import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';

export default class VendorsSubjectController extends Controller {
  page = 0;
  size = 20;

  get vendor() {
    let owner = getOwner(this);
    return owner.lookup(`controller:vendors/details`);
  }

  @action 
  async removeFromList(bestuurseenheid){

  let targetVendor = this.vendor.model
  let relationship = this.vendor.model.canActOnBehalfOf;

  relationship.removeObject(bestuurseenheid);
  targetVendor.save();
  }

}