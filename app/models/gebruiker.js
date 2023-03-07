import Model, { attr, hasMany } from '@ember-data/model';

export default class Gebruiker extends Model {
  @attr voornaam;
  @attr achternaam;
  @attr rijksregisterNumeer;

  @hasMany('bestuurseenheid', { async: true, inverse: null }) bestuurseenheden;
}
