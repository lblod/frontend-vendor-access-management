import { helper } from '@ember/component/helper';

export default helper(function stringConcat(positional /*, named*/) {
  return positional.join('');
});
