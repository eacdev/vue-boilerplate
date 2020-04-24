import Vue, { VNode } from 'vue';
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
    setCurrentUser(state, user): void {
      state.currentUser = user;
    },
    setCurrentServer(state, server): void {
      state.currentServer = server;
    }
  }
});

async function isAuthenticated<V extends Vue = Vue>(
  to: Route,
  from: Route,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: (to?: RawLocation | false | ((vm: V) => any) | void) => void
): Promise<void> {
  const response = await new AuthClient().me();
  if (response.data) {
    store.commit('setCurrentUser', response.data);
  }
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
  mode: 'history',
  routes
});

new Vue({
  router,
  store,
  render: (h): VNode => h(App)
}).$mount('#app');
