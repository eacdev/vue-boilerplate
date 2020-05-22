<template>
  <div>
    <div class="p-8">
      <div
        class="text-3xl font-semibold cursor-pointer font-title text-indigo-dark"
      >
        Chat!
      </div>

      <button
        class="w-full px-4 py-3 mt-5 text-sm font-bold rounded-full bg-indigo-lighter text-indigo"
        @click="showModal = true"
      >
        + New Server
      </button>

      <CreateServerModal v-if="showModal" @close="showModal = false" />
    </div>

    <div class="mt-4">
      <div
        v-for="server of this.servers"
        :key="server.id"
        @click="joinServer(server)"
        :class="[
          { 'text-black active': server.id === $store.state.currentServer.id },
          { 'text-gray-muted': server.id !== $store.state.currentServer.id }
        ]"
        class="flex items-center p-3 pl-8 font-bold cursor-pointer server-wrapper align-center hover:text-black"
      >
        <span class="mr-2">#</span>
        {{ server.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Server from '../../resources/server/server.model';

import CreateServerModal from '../chat/CreateServerModal.vue';

@Component({
  components: {
    CreateServerModal
  }
})
export default class ServerList extends Vue {
  @Prop({
    type: Array,
    default: () => [{}]
  })
  private servers!: Server[];

  showModal = true;

  joinServer(server: Server): void {
    this.$emit('join-server', server);
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
