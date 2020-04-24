<template>
  <nav class="flex items-baseline justify-between px-4 py-4 text-white shadow">
    <div class="flex justify-between">
      <router-link class="text-xl font-bold" to="/home">Chat!</router-link>
    </div>
    <div class="flex">
      <div v-if="$store.state.currentUser">
        <router-link to="/somewhere" class="py-0 ml-5 cursor-pointer">{{
          $store.state.currentUser.username
        }}</router-link>
        <p
          class="inline py-0 ml-5 cursor-pointer hover:text-indigo"
          @click="logout"
        >
          Log Out
        </p>
      </div>
      <div v-else>
        <router-link to="/login" class="py-0 ml-5 cursor-pointer"
          >Login</router-link
        >
        <router-link to="/register" class="py-0 ml-5 cursor-pointer"
          >Register</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Store from 'vuex';
import Router from 'vue-router';
import { Component, Vue } from 'vue-property-decorator';

import AuthClient from '../../resources/auth/auth.client';

@Component
export default class NavBar extends Vue {
  authClient!: AuthClient;

  async logout(): Promise<void> {
    try {
      await this.authClient.logout();

      this.$store.commit('setCurrentUser', undefined);

      this.$router.push({ name: 'login' });
    } catch (e) {
      console.log('There was an error logging you out.');
    }
  }

  mounted(): void {
    this.authClient = new AuthClient();
  }
}
</script>

<style scoped lang="scss">
.router-link-active {
  @apply text-indigo;
}
</style>
