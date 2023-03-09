import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class VendorsDetailsController extends Controller {
  @service router;
  @service store;
  @tracked bestuurseenhedenLijst = [];
  @tracked isAddingAdministrativeUnits = false;

  get vendor() {
    return this.model;
  }

  addToList = task({ drop: true }, async () => {
    await Promise.all(
      this.bestuurseenhedenLijst.map(async (bestuurseenheid) => {
        const vendors = await bestuurseenheid.vendors;
        vendors.push(this.vendor);
        await bestuurseenheid.save();
      })
    );

    this.bestuurseenhedenLijst = [];
    this.router.refresh('vendors.details');
    this.closeAddModal();
  });

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
