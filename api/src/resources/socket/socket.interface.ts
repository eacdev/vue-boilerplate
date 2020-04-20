import { Socket } from 'socket.io';

export default interface SocketInterface extends Socket {
  /**
   * The last room a user has joined.
   * We need this property so we can notify users
   * in that room when the socket has disconnected.
   */
  lastRoom: string;
}
