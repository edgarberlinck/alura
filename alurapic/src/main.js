import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import { routes } from './routes';
import './directives/Transform';
import msg from './pt_BR';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/v1';
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  /**
   * Mode History remove o /# da url mas par aque isso funcione o servidor deve sempre retornar a index
   */
  mode: 'history'
});
Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
