<template>
  <div
    class="flex justify-center align-center items-center fixed z-50 top-0 left-0 w-full h-full bg-black-transparent"
  >
    <div class="w-1/3 bg-white">
    Hi</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CreateServerModal extends Vue {}
</script>

<style lang="scss" scoped>
.bg-black-transparent {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
