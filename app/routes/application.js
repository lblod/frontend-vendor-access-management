import Route from '@ember/routing/route';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ApplicationRoute extends Route {
  @service currentSession;
  @service session;
  @tracked error;

  async beforeModel() {
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
