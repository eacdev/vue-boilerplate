<template>
  <div
    class="fixed top-0 left-0 z-50 flex items-start justify-center flex-shrink-0 w-full h-full bg-black-transparent"
  >
    <!-- don't set explicit height -->
    <div class="flex flex-col w-1/3 mt-48 bg-white rounded-md">
      <form @submit.prevent="createServer">
        <div class="flex flex-col items-center justify-center px-4 py-6">
          <div class="text-xl font-bold">
            Create your server
          </div>
          <div class="mt-3 text-lg text-center text-gray-muted">
            By creating a server, you will have <strong>free</strong> text chat
            to use amongst your friends.
          </div>
        </div>
        <div class="px-4 py-3">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-bold" for="serverName">
              Server Name
            </label>
            <input
              v-model="serverName"
              class="w-full px-3 py-2 border rounded shadow appearance-none"
              id="serverName"
              name="serverName"
              required
            />
            <small v-if="serverNameError" class="mt-3 font-bold text-red-500">{{
              serverNameError
            }}</small>
          </div>
        </div>
        <div class="flex flex-row-reverse px-4 py-3 bg-gray-100">
          <span class="flex space-x-2 rounded-md">
            <button
              @click="close"
              class="inline-flex justify-center w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white bg-purple-500 border rounded-md"
              type="submit"
            >
              Create
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServerClient from '../../resources/server/server.client';
import ErrorResponse from '../../resources/base/error.response';

@Component
export default class CreateServerModal extends Vue {
  serverClient: ServerClient;

  serverName = '';

  serverNameError = '';

  close(): void {
    this.$emit('close');
  }

  async createServer(): Promise<void> {
    try {
      const response = await this.serverClient.create({
        name: this.serverName
      });
    } catch (e) {
      if (!e.response.data.error.errors) {
        this.serverNameError = e.response.data.error.message;
        return;
      }
      e.response.data.error.errors.forEach((error: ErrorResponse) => {
        if (error.path === 'name') {
          this.serverNameError = error.message;
        }
      });
    }
  }

  mounted(): void {
    this.serverClient = new ServerClient();
  }
}
</script>

<style lang="scss" scoped>
.bg-black-transparent {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
