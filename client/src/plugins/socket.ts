import { VueConstructor } from 'vue';
import SocketIO from 'socket.io-client';

export default class VueSocketIO {
  io: SocketIOClient.Socket;

  constructor() {
    this.io = this.connect();
  }

  install(Vue: VueConstructor): void {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$socket = this.io;
  }

  // eslint-disable-next-line class-methods-use-this
  connect(): SocketIOClient.Socket {
    const io = SocketIO('http://localhost:8080', {
      autoConnect: false,
      reconnection: false,
      upgrade: false
    });

    return io;
  }
}
