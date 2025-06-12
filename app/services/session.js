import { service } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';
import ENV from 'frontend-vendor-access-management/config/environment';
import { isValidAcmidmConfig } from 'frontend-vendor-access-management/utils/acmidm';

export default class LoketSessionService extends SessionService {
  @service currentSession;

  get isAcmIdmSession() {
    if (!this.isAuthenticated) {
      return false;
    }

    return this.data.authenticated.authenticator === 'authenticator:acm-idm';
  }

  requireAuthentication(transition) {
    const loginRoute = isValidAcmidmConfig(ENV.acmidm)
      ? 'acmidm-login'
      : 'mock-login';

    return super.requireAuthentication(transition, loginRoute);
  }

  invalidate() {
    // We store the flag here since the data is cleared before the handleInvalidation method is called.
    this.wasAcmIdmSession = this.isAcmIdmSession;
    super.invalidate(...arguments);
  }

  handleInvalidation(logoutUrl) {
    if (this.wasAcmIdmSession) {
      logoutUrl = ENV.acmidm.logoutUrl;
    } else {
      logoutUrl = '/mock-login';
    }

    super.handleInvalidation(logoutUrl);
  }
}
