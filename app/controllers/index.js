import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked isLoggedIn = false;

  @action login(){
    console.log("loggin");
    let account = this.store.createRecord('account');
    account.save(); 
    this.isLoggedIn = true;
  }
}
