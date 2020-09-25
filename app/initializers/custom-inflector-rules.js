import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;

  inflector.plural(/eid$/,'eden');
}

export default {
  name: 'custom-inflector-rules',
  initialize
};
