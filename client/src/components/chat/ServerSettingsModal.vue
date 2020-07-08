<template>
  <div class="w-4 h-4 text-sm font-semibold">
    <svg
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ServerSettingsModal extends Vue {}
</script>

<style lang="scss" scoped></style>
