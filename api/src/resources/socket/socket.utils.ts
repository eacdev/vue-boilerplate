/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import SocketInterface from './socket.interface';

import logger from '../../logger';

/**
 * Wraps socket.leave in a promise.
 * @param socket The socket we want to act on.
 * @param room The room id that we want to leave.
 */
const leaveRoom = (socket: SocketInterface, room: string) => {
  return new Promise(resolve => {
    socket.leave(room, () => {
      socket.to(room).emit('userTypingEnded', socket.request.session.user);

      logger.info('socket.utils.leaveRoom', {
        args: { room },
        socketId: socket.id,
        socketSession: socket.request.session
      });

      resolve();
    });
  });
};

/**
 * Leave all rooms the socket is in except the default room.
 * @param socket Socket we want to act on.
 */
export const leaveRooms = async (socket: SocketInterface) => {
  for (const room in socket.rooms) {
    // If it's not the private room.
    if (room !== socket.id) {
      // eslint-disable-next-line no-await-in-loop
      await leaveRoom(socket, room);

      socket.to(room).emit('userLeft', socket.request.session.user);
    }
  }
};

/**
 *  Wraps socket.join in a promise.
 * @param socket The socket we want to act on.
 * @param room The room id that we want to join.
 */
export const joinRoom = (socket: SocketInterface, room: string) => {
  return new Promise(resolve => {
    socket.join(room, () => {
      // eslint-disable-next-line no-param-reassign
      socket.lastRoom = room;

      logger.info('socket.utils.joinRoom', {
        args: { room },
        socketId: socket.id,
        socketSession: socket.request.session
      });

      resolve();
    });
  });
};
