import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class VendorsSubjectController extends Controller {
  sort = "naam";
  page = 0;
  size = 20;

  @action
  async removeFromList(bestuurseenheid, vendor){
    (await vendor.canActOnBehalfOf).removeObject(bestuurseenheid);
    await vendor.save();
    //We must trigger model(), since the pagination depends on this.
    //See also https://github.com/lblod/frontend-loket/blob/48f733e26b5a0aa1737f7c7bf920f7450c608956/app/controllers/mandatenbeheer/mandatarissen/edit.js
    this.send('reloadModel');
  }
}
