<template>
  <div>
    <div class="p-8">
      <div
        class="text-3xl font-semibold cursor-pointer font-title text-indigo-dark"
      >
        Chat!
      </div>

      <WizardModal v-model="showWizardModal" />

      <button
        class="w-full px-4 py-3 mt-5 text-sm font-bold rounded-full bg-indigo-lighter text-indigo"
        @click="showNewServerModal = true"
      >
        + New Server
      </button>

      <NewServerModal
        v-model="showNewServerModal"
        @create-server="createServer"
      />
    </div>

    <InviteFriendsModal
      v-model="showInviteFriendsModal"
      :server="$store.state.currentServer"
    ></InviteFriendsModal>

    <div class="mt-4">
      <div
        v-for="server of this.servers"
        :key="server.id"
        @click="joinServer(server)"
        :class="[
          { 'text-black active': server.id === $store.state.currentServer.id },
          { 'text-gray-muted': server.id !== $store.state.currentServer.id }
        ]"
        class="flex items-center p-3 pl-8 font-bold server-wrapper align-center hover:text-black"
      >
        <span class="mr-2">#</span>
        <div class="flex justify-between w-full cursor-pointer">
          {{ server.name }}
          <ServerSettingsPopOver
            @invite-friends="inviteFriends"
            v-if="server.id === $store.state.currentServer.id"
          ></ServerSettingsPopOver>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Server from '../../resources/server/server.model';

import Modal from '../chat/Modal.vue';

import NewServerModal from './NewServerModal.vue';
import InviteFriendsModal from './InviteFriendsModal.vue';

import ServerSettingsPopOver from './ServerSettingsPopOver.vue';

@Component({
  components: {
    Modal,
    NewServerModal,
    InviteFriendsModal,
    ServerSettingsPopOver
  }
})
export default class ServerList extends Vue {
  @Prop({
    type: Array,
    default: () => [{}]
  })
  private servers!: Server[];

  showWizardModal = true;
  showNewServerModal = false;
  showInviteFriendsModal = false;

  createServer(server: Server): void {
    this.$emit('create-server', server);

    setTimeout(() => {
      this.showInviteFriendsModal = true;
    }, 1000);
  }

  joinServer(server: Server): void {
    this.$emit('join-server', server);
  }

  inviteFriends(value: boolean): void {
    this.showInviteFriendsModal = value;
  }
}
</script>

<style lang="scss" scoped>
.server-wrapper {
  position: relative;
}

.server-wrapper::before {
  content: '';
  left: 0;
  width: 5px;
  height: 100%;
  background: #7c6bf9;
  visibility: hidden;
  position: absolute;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.server-wrapper.active::before {
  visibility: visible;
}
</style>
