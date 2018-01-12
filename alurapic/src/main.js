import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  /**
   * Mode History remove o /# da url mas par aque isso funcione o servidor deve sempre retornar a index
   */
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
