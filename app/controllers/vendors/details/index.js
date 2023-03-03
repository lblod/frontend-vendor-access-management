import Controller from '@ember/controller';
import { action } from '@ember/object';
import { loadAllVendorsForEenheid } from 'frontend-vendor-access-management/utils/load-relation-utils';

export default class VendorsSubjectController extends Controller {
  sort = 'naam';
  page = 0;
  size = 20;

  @action
  async removeFromList(bestuurseenheid, vendor) {
    const allVendors = await loadAllVendorsForEenheid(
      this.store,
      bestuurseenheid
    );
    const updatedVendors = allVendors.filter((v) => v.id != vendor.id);
    (await bestuurseenheid.vendors).setObjects(updatedVendors);
    await bestuurseenheid.save();
    //We must trigger model(), since the pagination depends on this.
    //See also https://github.com/lblod/frontend-loket/blob/48f733e26b5a0aa1737f7c7bf920f7450c608956/app/controllers/mandatenbeheer/mandatarissen/edit.js
    this.send('reloadModel');
  }
}
