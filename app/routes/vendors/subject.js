import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Route.extend(DataTableRouteMixin, {
  modelName: 'vendor',
  mergeQueryOptions(params) {
    return { 
      included: 'can-act-on-behalf-of',
      'filter[id]': params.id
   };
  }
});




