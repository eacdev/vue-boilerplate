<template>
  <!-- https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/ -->
  <div class="flex h-full">
    <Chat class="flex-1" :messages="messages" :usersTyping="usersTyping"></Chat>
    <InviteModal
      @close="showInviteModal = false"
      v-if="showInviteModal"
      :server="$store.state.currentServer"
    ></InviteModal>
    <ServerList
      class="order-first bg-white flex-fixed"
      :servers="servers"
      @join-server="joinServer"
      @create-server="createServer"
    ></ServerList>
    <UserList class="bg-white flex-fixed" :users="users"></UserList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SocketIOClient from 'socket.io-client';

import ServerClient from '../resources/server/server.client';
import MessageClient from '../resources/message/message.client';

import Chat from './chat/Chat.vue';
import UserList from './chat/UserList.vue';
import ServerList from './chat/ServerList.vue';
import InviteModal from './chat/InviteModal.vue';

import User from '../resources/user/user.model';
import Server from '../resources/server/server.model';
import Message from '../resources/message/message.model';

@Component({
  components: {
    Chat,
    UserList,
    ServerList,
    InviteModal
  }
})
export default class Home extends Vue {
  ServerClient!: ServerClient;

  MessageClient!: MessageClient;

  $socket!: SocketIOClient.Socket;

  users: User[] = [];

  servers: Server[] = [];

  messages: Message[] = [];

  usersTyping: User[] = [];

  showInviteModal = false;

  async joinServer(server: Server): Promise<void> {
    // todo: Improvement, maybe server name isn't the best way to identify rooms
    this.$store.commit('setCurrentServer', server);

    this.$socket.emit('joinRoom', server.name);

    this.usersTyping = [];

    this.messages = (
      await this.MessageClient.index(this.$store.state.currentServer.id)
    ).data;
  }

  async createServer(server: Server): Promise<void> {
    this.servers.push(server);

    await this.joinServer(server);

    setTimeout(() => {
      this.showInviteModal = true;
    }, 1000);
  }

  async created(): Promise<void> {
    this.MessageClient = new MessageClient();
    this.ServerClient = new ServerClient();

    // todo: move out of created because network access
    this.servers = (await this.ServerClient.index()).data;

    this.$socket.connect();

    this.$socket.on('newMessage', (message: Message) => {
      this.messages.push(message);
    });

    this.$socket.on('connectedUsers', (users: User[]) => {
      this.users = users;
    });

    this.$socket.on('userJoined', (user: User) => {
      this.users.push(user);
    });

    this.$socket.on('userLeft', (user: User) => {
      const users = this.users.filter(
        (connectedUser: User) => connectedUser.id !== user.id
      );
      this.users = users;
    });

    this.$socket.on('userTypingEnded', (user: User) => {
      const usersTyping = this.usersTyping.filter(elem => elem.id !== user.id);
      this.usersTyping = usersTyping;
    });

    this.$socket.on('userTypingStarted', (user: User) => {
      if (!this.usersTyping.find(elem => elem.id === user.id)) {
        this.usersTyping.push(user);
      }
    });

    this.$socket.on('error', (error: string) => {
      console.log(error);
    });

    // todo: allow default server to be set by user?
    await this.joinServer(this.servers[0]);
  }

  beforeDestroy(): void {
    this.$socket.disconnect();
  }
}
</script>

<style scoped lang="scss"></style>
