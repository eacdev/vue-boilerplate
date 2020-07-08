<template>
  <div>
    <div
      class="w-4 h-4 text-sm font-semibold rotate"
      :class="{ down: show }"
      @click="toggle"
    >
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
    <div
      v-if="show"
      class="bg-white border border-gray-100 rounded-sm shadow-md cursor-default popover"
    >
      <div class="flex flex-col w-full px-3 py-3">
        <div
          class="w-full p-2 text-gray-700 rounded-sm cursor-pointer hover:text-indigo"
        >
          <div
            class="flex flex-row justify-between subpixel-antialiased font-normal"
          >
            Invite People
            <svg
              class="w-4"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ServerSettingsModal extends Vue {
  show = false;

  toggle(): void {
    this.show = !this.show;
  }
}
</script>

<style lang="scss" scoped>
.rotate {
  -moz-transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.rotate.down {
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.popover {
  position: absolute;
  height: 110px;
  width: 100%;
  left: 12%;
  top: 45px;
  z-index: 9999;
}
</style>
