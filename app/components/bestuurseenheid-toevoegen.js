import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { VIEW_ONLY_MODES } from 'frontend-vendor-access-management/utils/constants';

export default class BestuurseenheidToevoegenComponent extends Component {
  viewOnlyModules = VIEW_ONLY_MODES;
  selectedViewOnlyModulesSet = new Set();

  @service store;

  @tracked selected = undefined;
  @tracked searchData;

  get selectedViewOnlyModules() {
    return [...this.selectedViewOnlyModulesSet];
  }

  get isSearching() {
    return Boolean(this.searchData);
  }

  get options() {
    if (!this.isSearching) {
      return [];
    }

    return this.searchData.results.filter((bestuurseenheid) => {
      return !this.args.bestuurseenhedenLijst.includes(bestuurseenheid);
    });
  }

  @action
  setOption(selected) {
    this.selected = selected;
    this.changedBestuurseenheid();
  }

  @action
  changeViewOnlyModules(values, event) {
    if (event.target.checked)
      this.selectedViewOnlyModulesSet.add(event.target.value);
    else this.selectedViewOnlyModulesSet.delete(event.target.value);
    this.changedBestuurseenheid();
  }

  @action
  changedBestuurseenheid() {
    this.selected.viewOnlyModules = this.selectedViewOnlyModules;
    this.args.onSelect(this.selected);
  }

  search = task({ restartable: true }, async (searchTerm) => {
    await timeout(600);

    const results = await this.fetchAdministrativeUnits({ searchTerm });

    this.searchData = new SearchData({
      totalResultAmount: results.meta.count,
      searchTerm: searchTerm,
      results: results.slice(),
    });
  });

  loadMoreSearchResults = task({ drop: true }, async () => {
    if (this.isSearching) {
      let results = await this.fetchAdministrativeUnits({
        searchTerm: this.searchData.searchTerm,
        page: ++this.searchData.currentPage,
      });

      this.searchData.addSearchResults(results.slice());
    }
  });

  @action
  registerAPI(api) {
    // PowerSelect doesn't have an action to let us know when the search data is reset, so we use the registerAPI as a workaround.
    // It get's called everytime any internal state has changed, so we can use it to detect when the searchText has cleared.
    if (!api.searchText && this.searchData) {
      this.searchData = null;
    }
  }

  async fetchAdministrativeUnits({ searchTerm, page = 0 }) {
    return this.store.query('bestuurseenheid', {
      'filter[naam]': searchTerm,
      sort: 'naam',
      include: 'classificatie',
      'page[number]': page,
    });
  }
}

class SearchData {
  @tracked results = [];
  currentPage = 0;

  constructor({ totalResultAmount, searchTerm, results }) {
    this.totalResultAmount = totalResultAmount;
    this.searchTerm = searchTerm;
    this.results = results;
  }

  get canLoadMoreSearchResults() {
    return this.totalResultAmount > this.results.length;
  }

  addSearchResults(newResults = []) {
    this.results = [...this.results, ...newResults];
  }
}
