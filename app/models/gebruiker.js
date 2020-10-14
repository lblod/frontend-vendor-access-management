import Model, {attr, hasMany} from '@ember-data/model';

export default class Gebruiker extends Model {
  @attr voornaam;
  @attr achternaam;
  @attr rijksregisterNumeer;

  @hasMany('bestuurseenheid') bestuurseenheden;

  // used for mock login
  get group() {
    return this.bestuurseenheden.get('firstObject');
  }
}
