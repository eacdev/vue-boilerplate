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
      >
        + New Server
      </button>
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
        class="relative flex items-center p-3 pl-8 font-bold cursor-pointer server-wrapper align-center hover:text-black"
      >
        <span class="mr-2">#</span>
        {{ server.name }}
        <div
          v-if="server.id === $store.state.currentServer.id"
          class="flex items-center justify-center w-3 h-3 p-2 ml-3 text-xs text-white rounded-full bg-red"
        >
          9
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Server from '../../resources/server/server.model';

@Component
export default class ServerList extends Vue {
  @Prop({
    type: Array,
    default: () => [{}]
  })
  private servers!: Server[];

  joinServer(server: Server): void {
    this.$emit('join-server', server);
  }
}
</script>

<style lang="scss" scoped>
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
