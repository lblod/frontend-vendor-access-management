import Ember from 'ember';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(DataTableRouteMixin, {
  modelName: 'bestuurseenheid',

  mergeQueryOptions() {
    return {
      include: 'vendors',
     'filter[vendors][:id:]': this.modelFor('vendors/details').id
    };
  },

  setupController(controller, model){
    this._super(controller, model);
    controller.set('vendor', this.modelFor('vendors/details'));
  },

  actions: {
    reloadModel(){
      this.refresh();
    }
  }
});
