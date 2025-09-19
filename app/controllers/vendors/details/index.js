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
  @tracked isAddingAdministrativeUnits = false;
  @tracked bestuurseenheidToRemove;
  @tracked filter = '';
  @tracked page = 0;
  // TODO: this state is persisted when switching between different vendors, we should probably reset it when the vendor id changes
  @tracked hiddenKeyState = false;

  selectedNewBestuurseenheid;
  sort = 'naam';
  size = 20;

  get shouldShowDeleteConfirmationModal() {
    return Boolean(this.bestuurseenheidToRemove);
  }

  removeFromList = task(async () => {
    const bestuurseenheid = this.bestuurseenheidToRemove;
    const vendors = await bestuurseenheid.vendors;
    vendors.splice(vendors.indexOf(this.vendor), 1);
    bestuurseenheid.viewOnlyModules = [];
    await bestuurseenheid.save();
    //We must trigger model(), since the pagination depends on this.
    await this.router.refresh('vendors.details.index');
    this.hideDeleteConfirmationModal(true);
  });

  addToList = task({ drop: true }, async () => {
    const vendorsForBestuurseenheid =
      await this.selectedNewBestuurseenheid.vendors;
    vendorsForBestuurseenheid.push(this.vendor);
    await this.selectedNewBestuurseenheid.save();
    this.selectedNewBestuurseenheid = undefined;

    this.router.refresh('vendors.details');
    this.closeAddModal();
  });

  search = task({ restartable: true }, async (searchValue) => {
    await timeout(500);

    this.filter = searchValue.trim();
    this.resetPagination();
  });

  @action
  selectNewBestuurseenheid(bestuurseenheid) {
    this.selectedNewBestuurseenheid = bestuurseenheid;
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

  @action
  toggleHiddenKeyVisibility() {
    this.hiddenKeyState = !this.hiddenKeyState;
  }

  resetPagination() {
    this.page = 0;
  }
}
