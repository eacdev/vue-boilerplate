<template>
  <Modal v-model="internalValue">
    <template v-slot:title>
      Invite your friends
    </template>
    <template v-slot:subtitle>
      By sending this link to your friends, they'll be able to join and have a
      chat!.
    </template>
    <template v-slot:content>
      <div class="mb-6">
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold" for="serverName">
            Server Invite Code
          </label>
          <input
            readonly
            v-model="server.inviteCode"
            class="w-full px-3 py-2 border rounded shadow appearance-none"
            required
          />
        </div>
      </div>
    </template>
    <template v-slot:buttons>
      <button
        @click="close"
        class="inline-flex justify-center w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md"
      >
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Server from '../../resources/server/server.model';

import Modal from './Modal.vue';

@Component({
  components: {
    Modal
  }
})
export default class InviteFriendsModal extends Vue {
  @Prop({
    type: Boolean
  })
  value: boolean;

  @Prop({
    type: Object,
    default: () => {
      return {};
    }
  })
  private server: Server;

  close(): void {
    this.$emit('input', false);
  }

  get internalValue(): boolean {
    return this.value;
  }

  set internalValue(newValue: boolean) {
    this.$emit('input', newValue);
  }
}
</script>

<style lang="scss" scoped>
.bg-black-transparent {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
