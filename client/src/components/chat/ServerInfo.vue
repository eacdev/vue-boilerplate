<template>
  <div class="flex flex-col justify-between h-32 px-10 pt-16">
    <h1 class="text-2xl font-bold">{{ $store.state.currentServer.name }}</h1>
    <hr class="border-b-1 border-gray-darker" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ServerInfo extends Vue {}
</script>

<style lang="scss" scoped></style>
