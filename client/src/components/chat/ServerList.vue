<template>
  <div>
    <div class="mb-4">
      <p class="mb-1 text-base font-bold">Servers</p>
    </div>
    <ul>
      <li
        v-for="server of this.servers"
        :key="server.id"
        @click="joinServer(server)"
        :class="{ 'text-indigo': server.id === $store.state.currentServer.id }"
        class="cursor-pointer hover:text-indigo"
      >
        {{ server.name }}
      </li>
    </ul>
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
