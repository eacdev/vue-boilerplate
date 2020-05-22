<template>
  <div
    class="flex items-start justify-center flex-shrink-0 fixed z-50 top-0 left-0 w-full h-full bg-black-transparent"
  >
    <!-- don't set explicit height -->
    <div class="flex flex-col w-1/3 mt-48 bg-white rounded-md">
      <div class="flex flex-col items-center px-4 py-6 justify-center">
        <div class="text-xl font-bold">
          Create your server
        </div>
        <div class="mt-3 text-lg text-gray-muted text-center">
          By creating a server, you will have <strong>free</strong> text chat to
          use amongst your friends.
        </div>
      </div>
      <div class="px-4 py-3">
        This is content.
      </div>
      <div class="bg-gray-100 px-4 py-3 flex flex-row-reverse">
        <span class="flex space-x-2 rounded-md">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white font-medium text-gray-700 text-sm leading-5"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 text-sm font-bold text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </span>
      </div>
    </div>
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
