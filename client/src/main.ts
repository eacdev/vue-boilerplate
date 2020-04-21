import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter, { RawLocation, Route, RouteConfig } from 'vue-router';

import './assets/tailwind.css';

import App from './App.vue';
import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';

import AuthClient from './resources/auth/auth.client';

import VueSocketIO from './plugins/socket';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.use(new VueSocketIO());

const store = new Vuex.Store({
  state: {
    currentUser: undefined,
    currentServer: undefined
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setCurrentServer(state, server) {
      state.currentServer = server;
    }
  }
});

async function getCurrentUser() {
  const response = await new AuthClient().me();
  store.commit('setCurrentUser', response.data);
}

async function isAuthenticated<V extends Vue = Vue>(
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: V) => any) | void) => void
) {
  await getCurrentUser();
  if (store.state.currentUser) {
    next();
  } else {
    next({ name: 'login' });
  }
}

const routes: RouteConfig[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    name: 'home',
    beforeEnter: isAuthenticated
  },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
