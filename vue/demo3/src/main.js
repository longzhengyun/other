import Vue from 'vue';
import app from './components/app';

require('./css/style.css');

Vue.config.debug = true;
new Vue(app);