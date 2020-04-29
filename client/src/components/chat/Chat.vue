<template>
  <div class="box-border flex flex-col h-full">
    <ServerInfo />

    <!-- Whatever is in this div. should scroll. -->
    <!-- TODO What if distance between scroll and sidebar? -->
    <div class="flex flex-col-reverse flex-1 px-20 py-3 overflow-auto">
      <div
        class="flex flex-col justify-end flex-1 space-y-3"
        id="messagesContainer"
      >
        <div
          class="self-start max-w-md p-6 rounded-lg bg-gray-darker"
          :class="[
            {
              'self-end rounded-br-none bg-blue text-white':
                message.user.id === $store.state.currentUser.id
            },
            {
              'self-start rounded-bl-none':
                message.user.id !== $store.state.currentUser.id
            }
          ]"
          v-for="message in messages"
          :key="message.id"
        >
          {{ message.text }}
        </div>
      </div>
    </div>

    <input
      type="text"
      placeholder="Enter a message"
      class="p-5 mx-10 mb-3 rounded bg-gray-light focus:outline-none"
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

import ServerInfo from '../chat/ServerInfo.vue';

import User from '../../resources/user/user.model';
import Message from '../../resources/message/message.model';

@Component({
  components: {
    ServerInfo
  }
})
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
    const element = document.getElementById('messagesContainer');
    element.scrollTop = element.scrollHeight;
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

  mounted(): void {
    const element = document.getElementById('messagesContainer');
    element.scrollTop = element.scrollHeight;
  }
}
</script>

<style lang="scss"></style>
