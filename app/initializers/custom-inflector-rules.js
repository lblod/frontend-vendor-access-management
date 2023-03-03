import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;

  inflector.irregular('bestuurseenheid', 'bestuurseenheden');
  inflector.irregular('vendor', 'vendors');
}

export default {
  name: 'custom-inflector-rules',
  initialize,
};
