import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service intl;

  async beforeModel() {
    // We default to dutch, because that's what most of our apps use.
    this.intl.setLocale(['nl-be']);
    await this.session.setup();
  }
}
