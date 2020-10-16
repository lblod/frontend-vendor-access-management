import Controller from '@ember/controller';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';

export default class VendorsSubjectController extends Controller {
  page = 0;
  size = 20;

  @action 
  async removeFromList(bestuurseenheid, vendor){
    let relationship = await vendor.canActOnBehalfOf;
    relationship.removeObject(bestuurseenheid);
    vendor.save();
  }
}