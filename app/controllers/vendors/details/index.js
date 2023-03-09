import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class VendorsSubjectController extends Controller {
  @service router;
  @service store;
  @tracked vendor;
  @tracked bestuurseenhedenLijst = [];
  @tracked isAddingAdministrativeUnits = false;
  @tracked bestuurseenheidToRemove;
  sort = 'naam';
  page = 0;
  size = 20;

  get shouldShowDeleteConfirmationModal() {
    return Boolean(this.bestuurseenheidToRemove);
  }

  removeFromList = task(async () => {
    const bestuurseenheid = this.bestuurseenheidToRemove;
    const vendors = await bestuurseenheid.vendors;
    vendors.splice(vendors.indexOf(this.vendor), 1);
    await bestuurseenheid.save();
    //We must trigger model(), since the pagination depends on this.
    this.router.refresh('vendors.details.index');
    this.hideDeleteConfirmationModal(true);
  });

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

  @action
  showDeleteConfirmationModal(bestuurseenheid) {
    this.bestuurseenheidToRemove = bestuurseenheid;
  }

  @action
  hideDeleteConfirmationModal(force = false) {
    if (this.removeFromList.isIdle || force) {
      this.bestuurseenheidToRemove = null;
    }
  }
}
