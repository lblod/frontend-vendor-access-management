import Route from '@ember/routing/route';
import { service } from '@ember/service';
import buildUrlFromConfig from '@lblod/ember-acmidm-login/utils/build-url-from-config';
import ENV from 'frontend-vendor-access-management/config/environment';
import { isValidAcmidmConfig } from 'frontend-vendor-access-management/utils/acmidm';

export default class AcmidmLoginRoute extends Route {
  @service session;

  beforeModel() {
    if (this.session.prohibitAuthentication('index')) {
      if (isValidAcmidmConfig(ENV.acmidm)) {
        window.location.assign(buildUrlFromConfig(ENV.acmidm));
      } else {
        throw new Error('Missing ACM/IDM config');
      }
    }
  }
}
