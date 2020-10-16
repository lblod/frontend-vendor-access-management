import Ember from 'ember';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(DataTableRouteMixin, {
  modelName: 'vendor',
  mergeQueryOptions() {
    return { 
      include: 'can-act-on-behalf-of',
     'filter[id]': this.modelFor('vendors/details').id
    };
  }
});