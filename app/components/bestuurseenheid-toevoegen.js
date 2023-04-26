import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { dropTask, restartableTask, timeout } from 'ember-concurrency';

export default class BestuurseenheidToevoegenComponent extends Component {
  @service store;

  @tracked selected = undefined;
  @tracked searchData;

  get isSearching() {
    return Boolean(this.searchData);
  }

  get options() {
    if (!this.isSearching) {
      return [];
    }

    //TODO filter through a different list, we're not using pre lists anymore
    return this.searchData.results.filter((bestuurseenheid) => {
      return !this.args.bestuurseenhedenLijst.includes(bestuurseenheid);
    });
  }

  @action
  setOption(selected) {
    this.selected = selected;
  }

  @restartableTask
  *search(searchTerm) {
    yield timeout(600);

    let results = yield this.fetchAdministrativeUnits({ searchTerm });

    this.searchData = new SearchData({
      totalResultAmount: results.meta.count,
      searchTerm: searchTerm,
      results: results.slice(),
    });
  }

  @dropTask
  *loadMoreSearchResults() {
    if (this.isSearching) {
      let results = yield this.fetchAdministrativeUnits({
        searchTerm: this.searchData.searchTerm,
        page: ++this.searchData.currentPage,
      });

      this.searchData.addSearchResults(results.slice());
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
