import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class VendorsRoute extends Route {
  @service session;
  @service currentSession;

  beforeModel(transition) {
    if (this.session.requireAuthentication(transition, 'login')) {
      return this.loadCurrentSession();
    }
  }

  async loadCurrentSession() {
    try {
      await this.currentSession.load();
      if (!this.currentSession.canManageVendors)
        throw Error('This account can NOT manage vendors');
    } catch (e) {
      console.warn('Something went wrong while loading the session data', e);
      await this.session.invalidate();
    }
  }
}
