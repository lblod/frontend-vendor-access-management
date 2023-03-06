import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { loadAllBestuurseenheidenForVendor } from 'frontend-vendor-access-management/utils/load-relation-utils';

export default class VendorsDetailsController extends Controller {
  @service store;
  @tracked bestuurseenhedenLijst = [];
  @tracked isAddingAdministrativeUnits = false;

  @action
  async addToList(vendor) {
    const allEenheden = await loadAllBestuurseenheidenForVendor(
      this.store,
      vendor
    );
    const updatedEenheden = [...allEenheden, ...this.bestuurseenhedenLijst];
    (await vendor.canActOnBehalfOf).setObjects(updatedEenheden);
    await vendor.save();
    this.bestuurseenhedenLijst = [];
    this.send('reloadModel');
  }

  @action
  async appendBestuurseenheid(eenheid) {
    this.bestuurseenhedenLijst.pushObject(eenheid);
  }

  @action
  removeBestuurseenheid(eenheid) {
    this.bestuurseenhedenLijst = this.bestuurseenhedenLijst.without(eenheid);
  }

  @action
  copyToClipboard(key) {
    navigator.clipboard.writeText(key);
  }

  @action
  showAddModal() {
    this.isAddingAdministrativeUnits = true;
  }

  @action
  closeAddModal() {
    this.isAddingAdministrativeUnits = false;
  }
}
