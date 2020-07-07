<template>
  <div class="flex flex-col h-screen">
    <!-- <NavBar></NavBar> -->
    <div class="w-full h-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from './components/layout/NavBar.vue';

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
