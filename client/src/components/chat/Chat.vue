<template>
  <!-- TODO: Make chat reusable, put message list and chat bar in their own components. -->
  <div class="box-border flex flex-col h-full">
    <ul class="flex flex-col justify-end flex-1">
      <li class="mt-3" v-for="message in messages" :key="message.id">
        <strong>{{ message.user.username }}</strong
        >: {{ message.text }}
      </li>
    </ul>

    <input
      type="text"
      placeholder="Enter a message"
      class="p-3 mt-5 rounded bg-gray-light focus:outline-none"
      id="chatInput"
      v-model="chatInputMessage"
      @keypress="handleKeypress"
      v-on:keyup.enter="addMessage(chatInputMessage)"
    />

    <span>{{ usersTypingNotification }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { debounce } from 'lodash';

import User from '../../resources/user/user.model';
import Message from '../../resources/message/message.model';

@Component
export default class Chat extends Vue {
  $socket!: SocketIOClient.Socket;

  @Prop({
    type: Array,
    default: () => [{}]
  })
  private messages!: Message[];

  @Prop({
    type: Array,
    default: () => [{}]
  })
  private usersTyping!: User[];

  chatInputMessage = '';

  get usersTypingNotification(): string {
    if (this.usersTyping.length === 0) return '';
    return `${this.usersTyping.map(user => user.username).join(', ')} ${
      this.usersTyping.length === 1 ? 'is' : 'are'
    } typing...`;
  }

  addMessage(): void {
    // todo: Improvement, maybe server name isn't the best way to identify rooms
    this.$socket.emit(
      'newMessage',
      this.$store.state.currentServer.id,
      this.chatInputMessage,
      this.$store.state.currentServer.name
    );

    this.chatInputMessage = '';
  }

  handleKeypress(): void {
    this.debounceTypingStarted();
    this.debounceTypingEnded();
  }

  debounceTypingStarted = debounce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function(this: any) {
      this.$socket.emit(
        'userTypingStarted',
        this.$store.state.currentServer.name
      );
    },
    800,
    { leading: true }
  );

  debounceTypingEnded = debounce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function(this: any) {
      this.$socket.emit(
        'userTypingEnded',
        this.$store.state.currentServer.name
      );
    },
    3000,
    { leading: false }
  );
}
</script>

<style lang="scss"></style>
