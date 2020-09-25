import Application from 'frontend-vendor-access-management/app';
import config from 'frontend-vendor-access-management/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
