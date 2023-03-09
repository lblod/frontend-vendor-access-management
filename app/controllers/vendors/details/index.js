import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class VendorsSubjectController extends Controller {
  @service router;
  @service store;
  @tracked bestuurseenheidToRemove;
  @tracked vendor;
  sort = 'naam';
  page = 0;
  size = 20;

  get shouldShowDeleteConfirmationModal() {
    return Boolean(this.bestuurseenheidToRemove);
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

  removeFromList = task(async () => {
    const bestuurseenheid = this.bestuurseenheidToRemove;
    const vendors = await bestuurseenheid.vendors;
    vendors.splice(vendors.indexOf(this.vendor), 1);
    await bestuurseenheid.save();
    //We must trigger model(), since the pagination depends on this.
    this.router.refresh('vendors.details.index');
    this.hideDeleteConfirmationModal(true);
  });
}
