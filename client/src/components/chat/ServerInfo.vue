<template>
  <div class="w-full px-10 pt-20">
    <h1 class="text-2xl font-bold">{{ $store.state.currentServer.name }}</h1>
    <div
      class="flex flex-row justify-start my-3 text-lg space-x-3 text-gray-muted"
    >
      <div class="flex flex-row items-center align-baseline space-x-1">
        <div class="w-6 h-6">
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </div>
        <span>2</span>
      </div>
      <div class="flex flex-row items-center align-baseline space-x-1">
        <div class="w-6 h-6">
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            ></path>
          </svg>
        </div>
        <span>2</span>
      </div>
    </div>
    <hr class="border-b-1 border-gray-darker" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ServerInfo extends Vue {}
</script>

<style lang="scss" scoped></style>
