<!-- ------------------------------------------------------------------------------------------- -->
<!-- https://medium.com/@juantalon/loading-animations-4-imessage-s-typing-indicator-a515caf88ff4 -->
<!-- ------------------------------------------------------------------------------------------- -->
<template>
  <div>
    <svg
      version="1.1"
      id="loader"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="-49.5 -1.8 129 84.5"
      style="enable-background:new -49.5 -1.8 129 84.5;"
      xml:space="preserve"
    >
      <path
        style="fill:#E9E9E9;"
        d="M42.4,73.3H-0.4c-18.1,0-33-14.8-33-33v-4.7c0-18.1,14.9-33,33-33h42.8c18.2,0,33,14.9,33,33v4.7
    C75.4,58.5,60.5,73.3,42.4,73.3z"
      />
      <circle style="fill:#C8C8C8;" cx="1" cy="38" r="9" />
      <circle style="fill:#C8C8C8;" cx="21" cy="38" r="9" />
      <circle style="fill:#C8C8C8;" cx="41" cy="38" r="9" />
      <circle style="fill:#E9E9E9;" cx="-25.2" cy="62.6" r="10.8" />
      <circle style="fill:#E9E9E9;" cx="-41" cy="74.8" r="5" />
    </svg>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TypingIndicator extends Vue {}
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
  font-size: 5em;
  fill: white;
}

@mixin fadeHelper($delay) {
  opacity: 0.35;
  animation: fade 0.7s cubic-bezier(0.39, 0.58, 0.57, 1) $delay infinite
    alternate-reverse;
}

#loader {
  circle {
    &:nth-of-type(1) {
      @include fadeHelper(0s);
    }

    &:nth-of-type(2) {
      @include fadeHelper(0.4s);
    }

    &:nth-of-type(3) {
      @include fadeHelper(0.8s);
    }

    &:nth-of-type(4) {
      animation: expandBigger 0.5s infinite alternate 0.4s;
    }

    &:nth-of-type(5) {
      animation: expandTiny 0.5s infinite alternate;
    }
  }

  path {
    animation: expandBiggest 1s linear infinite alternate;
  }
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.45;
  }
}

@mixin scaleCircle($factor, $cx, $cy) {
  transform: translate((1 - $factor) * $cx + px, (1 - $factor) * $cy + px)
    scale($factor);
}

@keyframes expandTiny {
  from {
    transform: scale(1);
  }
  to {
    @include scaleCircle(1.1, -41, 74.8);
  }
}

@keyframes expandBigger {
  from {
    transform: scale(1);
  }
  to {
    @include scaleCircle(1.1, -25.2, 62.6);
  }
}

@keyframes expandBiggest {
  from {
    transform: scale(1);
  }
  to {
    transform: translate(-0.525px, -0.9487500190734863px) scale(1.025);
  }
}
</style>
