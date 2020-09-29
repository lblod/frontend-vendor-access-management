import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class VendorsController extends Controller {
  @tracked sort = '';
  @tracked page = 0;
  @tracked size = 20;
}
