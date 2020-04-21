<template>
  <div class="container flex mx-auto mt-5 text-gray-darker">
    <div
      class="w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow md:max-w-md"
    >
      <h1 class="mb-4 text-lg subpixel-antialiased font-semibold text-center">
        Welcome Back!
      </h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold" for="username">
            Username
          </label>
          <input
            class="w-full px-3 py-2 border rounded shadow appearance-none text-gray-darker"
            :class="{ hasError: usernameError }"
            v-model="username"
            id="username"
            name="username"
            required
            minlength="5"
            type="username"
          />
          <small v-if="usernameError" class="mt-3 font-bold text-red-500">{{
            usernameError
          }}</small>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold" for="password">
            Password
          </label>
          <input
            class="w-full px-3 py-2 border rounded shadow appearance-none"
            :class="{ hasError: passwordError }"
            v-model="password"
            id="password"
            name="password"
            required
            minlength="8"
            type="password"
          />
          <small v-if="passwordError" class="mt-3 font-bold text-red-500">{{
            passwordError
          }}</small>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Store from 'vuex';
import Router from 'vue-router';

import SocketIOClient from 'socket.io-client';

import AuthClient from '../../resources/auth/auth.client';

import ErrorResponse from '../../resources/base/error.response';

@Component
export default class Login extends Vue {
  authClient!: AuthClient;

  username = '';

  usernameError = '';

  password = '';

  passwordError = '';

  $socket: SocketIOClient.Socket;

  async login(): Promise<void> {
    this.usernameError = '';
    this.passwordError = '';

    try {
      const response = await this.authClient.login({
        username: this.username,
        password: this.password
      });

      this.$store.commit('setCurrentUser', response.data);

      this.$router.push({ name: 'home' });
    } catch (e) {
      if (!e.response.data.error.errors) {
        this.usernameError = e.response.data.error.message;
        return;
      }
      e.response.data.error.errors.forEach((error: ErrorResponse) => {
        if (error.path === 'username') {
          this.usernameError = error.message;
        } else if (error.path === 'password') {
          this.passwordError = error.message;
        }
      });
    }
  }

  mounted() {
    this.authClient = new AuthClient();
  }
}
</script>

<style scoped lang="scss">
.hasError {
  @apply border-red-300 bg-red-100;
}
</style>
