<template>
  <div
    v-if="this.value"
    class="fixed top-0 left-0 z-50 flex items-start justify-center flex-shrink-0 w-full h-full bg-black-transparent"
  >
    <div class="flex flex-col w-1/3 mt-48 bg-white rounded-md">
      <div class="flex flex-col items-center justify-center px-4 py-6">
        <div class="text-xl font-bold">
          <slot name="title"></slot>
        </div>
        <div class="mt-3 text-lg text-center text-gray-muted">
          <slot name="subtitle"></slot>
        </div>
      </div>
      <div class="px-4 py-3">
        <slot name="content"></slot>
      </div>
      <div class="flex flex-row-reverse px-4 py-3 bg-gray-100">
        <span class="flex space-x-2 rounded-md">
          <slot name="buttons"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({
    type: Boolean
  })
  private value: boolean;
}
</script>

<style lang="scss" scoped>
.bg-black-transparent {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
