import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session;
  @service store;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  model() {
    const filter = {
      provider: 'https://github.com/lblod/mock-login-service',
      gebruiker: {
        bestuurseenheden: {
          ':uri:':
            'http://data.lblod.info/id/bestuurseenheden/141d9d6b-54af-4d17-b313-8d1c30bc3f5b',
        },
      },
    };
    return this.store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter: filter,
    });
  }
}
