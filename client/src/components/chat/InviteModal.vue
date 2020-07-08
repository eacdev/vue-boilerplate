<template>
  <div
    class="fixed top-0 left-0 z-50 flex items-start justify-center flex-shrink-0 w-full h-full bg-black-transparent"
  >
    <div class="flex flex-col w-1/3 mt-48 bg-white rounded-md">
      <div class="flex flex-col items-center justify-center px-4 py-6">
        <div class="text-xl font-bold">
          Invite your friends
        </div>
        <div class="mt-3 text-lg text-center text-gray-muted">
          By sending this link to your friends, they'll be able to join and have
          a chat!
        </div>
      </div>
      <div class="px-4 py-3">
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold" for="serverName">
            Server Invite Code
          </label>
          <input
            readonly
            v-model="this.server.inviteCode"
            class="w-full px-3 py-2 border rounded shadow appearance-none"
            required
          />
        </div>
      </div>
      <div class="flex flex-row-reverse px-4 py-3 bg-gray-100">
        <span class="flex space-x-2 rounded-md">
          <button
            @click="close"
            class="inline-flex justify-center w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md"
          >
            Done
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Server from '../../resources/server/server.model';

@Component
export default class CreateServerModal extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return {};
    }
  })
  private server: Server;

  close(): void {
    this.$emit('close');
  }
}
</script>

<style lang="scss" scoped>
.bg-black-transparent {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
