<template>
  <div>
    <div class="mb-4">
      <p class="mb-1 text-base font-bold">Users</p>
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
</style>
