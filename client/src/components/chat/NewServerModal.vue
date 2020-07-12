<template>
  <Modal v-model="internalValue">
    <template v-slot:title>
      Create your server
    </template>
    <template v-slot:subtitle>
      By creating a server, you will have <strong>free</strong> text chat to use
      amongst your friends.
    </template>
    <template v-slot:content>
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
    </template>
    <template v-slot:buttons>
      <button
        @click="internalValue = false"
        class="inline-flex justify-center w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md"
      >
        Cancel
      </button>
      <button
        class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white bg-purple-500 border rounded-md"
        @click="createServer"
      >
        Create
      </button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ServerClient from '../../resources/server/server.client';
import ErrorResponse from '../../resources/base/error.response';

import Modal from './Modal.vue';

@Component({
  components: {
    Modal
  }
})
export default class NewServerModal extends Vue {
  @Prop({
    type: Boolean
  })
  value: boolean;

  serverClient: ServerClient;

  serverName = '';

  serverNameError = '';

  async createServer(): Promise<void> {
    try {
      const response = await this.serverClient.create({
        name: this.serverName
      });

      this.$emit('create-server', response.data);

      this.close();
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

  close(): void {
    this.$emit('input', false);
  }

  get internalValue(): boolean {
    return this.value;
  }

  set internalValue(newValue: boolean) {
    this.$emit('input', newValue);
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
