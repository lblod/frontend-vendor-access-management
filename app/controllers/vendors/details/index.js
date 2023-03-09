import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class VendorsDetailsIndexController extends Controller {
  queryParams = ['filter', 'sort', 'page'];
  @service router;
  @service store;
  @tracked vendor;
  @tracked bestuurseenhedenLijst = [];
  @tracked isAddingAdministrativeUnits = false;
  @tracked bestuurseenheidToRemove;
  @tracked filter = '';
  @tracked page = 0;
  sort = 'naam';
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

  search = task({ restartable: true }, async (searchValue) => {
    await timeout(500);

    this.filter = searchValue.trim();
    this.resetPagination();
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

  resetPagination() {
    this.page = 0;
  }
}
