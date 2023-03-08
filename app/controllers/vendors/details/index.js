import Controller from '@ember/controller';
import { action } from '@ember/object';
import { loadAllVendorsForEenheid } from 'frontend-vendor-access-management/utils/load-relation-utils';
import { service } from '@ember/service';

export default class VendorsSubjectController extends Controller {
  @service router;
  @service store;
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
    this.router.refresh('vendors.details.index');
  }
}
