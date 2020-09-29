import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
export default Route.extend(DataTableRouteMixin, {
  modelName: 'vendors',
  
  model(params){
    console.log(params)
    return this.store.findAll('vendor')
  }
});
