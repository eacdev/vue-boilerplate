<template>
  <div class="box-border flex flex-col h-full pr-2">
    <!-- TODO: only load this if the app's state has been loaded -->
    <ServerInfo />

    <!-- Whatever is in this div. should scroll. -->
    <!-- TODO What if distance between scroll and sidebar? -->
    <div
      class="flex flex-col-reverse flex-1 px-10 py-3 overflow-auto"
      id="messageContainer"
    >
      <div class="flex flex-col justify-end flex-1 space-y-2">
        <div
          class="max-w-md"
          :class="[
            { 'self-end': message.user.id === $store.state.currentUser.id },
            { 'self-start': message.user.id !== $store.state.currentUser.id }
          ]"
          v-for="(message, index) in messages"
          :key="message.id"
        >
          <div
            class="p-6 rounded-lg bg-gray-darker"
            :class="[
              {
                'rounded-br-none bg-blue text-white':
                  message.user.id === $store.state.currentUser.id
              },
              {
                'rounded-bl-none':
                  message.user.id !== $store.state.currentUser.id
              }
            ]"
          >
            {{ message.text }}
          </div>
          <div v-if="messages[index + 1]">
            <div v-if="messages[index + 1].user.id !== message.user.id">
              {{ message.user.username }}
            </div>
          </div>
          <div v-if="index === messages.length - 1">
            {{ message.user.username }}
          </div>
        </div>
        <TypingIndicator class="max-w-md" v-if="usersTyping.length > 0">
          <span class="text-sm text-gray-muted">{{
            usersTypingNotification
          }}</span>
        </TypingIndicator>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { debounce } from 'lodash';

import ServerInfo from '../chat/ServerInfo.vue';
import TypingIndicator from '../chat/TypingIndicator.vue';

import User from '../../resources/user/user.model';
import Message from '../../resources/message/message.model';

@Component({
  components: {
    ServerInfo,
    TypingIndicator
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
    if (this.usersTyping.length > 2) return 'Several people are typing...';
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

<style lang="scss">
#messageContainer::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #e3eaf2;
}

#messageContainer::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

#messageContainer::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c4c4c4;
}
</style>
