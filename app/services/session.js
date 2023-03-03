import { inject as service } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';

export default class LoketSessionService extends SessionService {
  @service currentSession;

  async handleAuthentication(routeAfterAuthentication) {
    await this.currentSession.load();
    super.handleAuthentication(routeAfterAuthentication);
  }
}
