import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {

  @service session;
  @service store;

  beforeModel() {
    if (this.session.isAuthenticated)
      this.transitionTo('index');
  }

  model() {
    const filter = {
      provider: 'https://github.com/lblod/mock-login-service',
      gebruiker: {
        bestuurseenheden: 'Agentschap Binnenlands Bestuur'
      }
    };
    return this.store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter: filter
    });
  }
}
