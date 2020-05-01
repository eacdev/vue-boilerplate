<template>
  <div>
    <div class="flex flex-col justify-between h-32 pt-20 bg-gray">
      <div class="h-full">
        <p class="inline-block h-full text-xl font-bold tab">Users</p>
      </div>
    </div>
    <ul>
      <li
        v-for="user of users"
        :key="user.id"
        class="cursor-pointer hover:text-indigo"
      >
        <span class="indicator-online"></span> {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import User from '../../resources/user/user.model';

@Component
export default class UserList extends Vue {
  @Prop({
    type: Array,
    default: () => [{}]
  })
  private users!: User[];
}
</script>

<style scoped>
.indicator-online {
  background: #28b62c;
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
}

.tab {
  position: relative;
}

.tab::before {
  content: '';
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 5px;
  background: #7c6bf9;
  position: absolute;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
