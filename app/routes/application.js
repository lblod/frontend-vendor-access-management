import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { warn } from 'ember-debug';
import { inject as service } from '@ember/service';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';


export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {

  @service currentSession;

  beforeModel() {
    return this._loadCurrentSession();
  }

  async sessionAuthenticated() {
    await this._loadCurrentSession();

    // Since not calling this._super(...arguments) on the first line doesn't work
    // we copy the implementation ApplicationRouteMixin.sessionAuthenticated here
    const attemptedTransition = this.session.attemptedTransition;
    const cookies = getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

    if (attemptedTransition) {
      attemptedTransition.retry();
      this.session.attemptedTransition = null;
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    } else {
      this.transitionTo(this.routeAfterAuthentication);
    }
    // End of copy from ApplicationRouteMixin.sessionAuthenticated
  }

  sessionInvalidated() {
    this.transitionTo('login');
  }

  _loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });
  }
}
