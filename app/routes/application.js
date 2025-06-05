import Route from '@ember/routing/route';
import { warn } from '@ember/debug';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service currentSession;
  @service session;
  @service intl;

  async beforeModel() {
    // We default to dutch, because that's what most of our apps use.
    this.intl.setLocale(['nl-be']);
    await this.session.setup();
    await this._loadCurrentSession();
  }

  async _loadCurrentSession() {
    try {
      await this.currentSession.load();
      if (!this.currentSession.canManageVendors)
        throw Error('This account can NOT manage vendors');
    } catch (e) {
      warn(e, { id: 'session-load-failure' });
      await this.session.invalidate();
    }
  }
}
