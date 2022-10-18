import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { dropTask, restartableTask } from 'ember-concurrency-decorators';

export default class BestuurseenheidToevoegenComponent extends Component {
  @service store;

  @tracked selected = null;
  @tracked searchData;

  get isSearching() {
    return Boolean(this.searchData);
  }

  get options() {
    return this.isSearching ? this.searchData.results : [];
  }

  @restartableTask
  *search(searchTerm) {
    yield timeout(600);

    let results = yield this.fetchAdministrativeUnits({ searchTerm });

    this.searchData = new SearchData({
      totalResultAmount: results.meta.count,
      searchTerm: searchTerm,
      results: results.toArray(),
    });
  }

  @dropTask
  *loadMoreSearchResults() {
    if (this.isSearching) {
      let results = yield this.fetchAdministrativeUnits({
        searchTerm: this.searchData.searchTerm,
        page: ++this.searchData.currentPage,
      });

      this.searchData.addSearchResults(results.toArray());
    }
  }

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