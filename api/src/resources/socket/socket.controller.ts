import SocketIO from 'socket.io';
import SocketInterface from './socket.interface';

import logger from '../../logger';

import { leaveRooms, joinRoom } from './socket.utils';
import * as messageController from '../message/message.controller';

const handleIO = (io: SocketIO.Server) => (socket: SocketInterface) => {
  /**
   *
   * @param serverId Id of the server to send the message to.
   * @param text The data to send.
   * @param roomName Name of the room to send the message to.
   */
  const newMessageEvent = async (
    serverId: number,
    text: string,
    roomName: string
  ) => {
    let message;
    try {
      message = await messageController.create(socket.request, serverId, text);

      logger.info('socket.controller.newMessageEvent', {
        args: { serverId, text, roomName },
        socketId: socket.id,
        socketSession: socket.request.session
      });
    } catch (err) {
      logger.error('messageController.create', {
        args: { serverId, text },
        socketId: socket.id,
        socketSession: socket.request.session,
        err
      });
    }

    io.in(roomName).emit('newMessage', message);
  };

  /**
   * Join a room.
   * @param newRoom The room id to join.
   */
  const joinRoomEvent = async (newRoom: string) => {
    try {
      await leaveRooms(socket);
      await joinRoom(socket, newRoom);
    } catch (err) {
      io.to(socket.id).emit('error', err.message);

      logger.error('socket.controller.joinRoomEvent', {
        args: { newRoom },
        socketId: socket.id,
        socketSession: socket.request.session,
        err
      });

      return;
    }

    // The room we just joined.
    const room = io.sockets.adapter.rooms[newRoom];

    // A list of users in the room we just joined.
    const users = Object.keys(room.sockets).map((id: string) => {
      const connectedSocket = io.sockets.connected[id];
      return connectedSocket.request.session.user;
    });

    // Private message the socket a list of users in the room.
    io.to(socket.id).emit('connectedUsers', users);

    // Tell other users a new user has entered the room.
    socket.to(newRoom).emit('userJoined', socket.request.session.user);
  };

  const userTypingStartedEvent = (room: string) => {
    socket.to(room).emit('userTypingStarted', socket.request.session.user);
  };

  const userTypingEndedEvent = (room: string) => {
    socket.to(room).emit('userTypingEnded', socket.request.session.user);
  };

  const disconnectedEvent = () => {
    socket
      .to(socket.lastRoom)
      .emit('userTypingEnded', socket.request.session.user);
    socket.to(socket.lastRoom).emit('userLeft', socket.request.session.user);

    // eslint-disable-next-line no-param-reassign
    socket.lastRoom = '';

    logger.info('socket.controller.disconnect', {
      socketId: socket.id,
      socketSession: socket.request.session
    });
  };

  // On connection.
  logger.info('socket.controller.connect', {
    socketId: socket.id,
    socketSession: socket.request.session
  });

  socket.on('joinRoom', joinRoomEvent);

  socket.on('newMessage', newMessageEvent);

  socket.on('userTypingStarted', userTypingStartedEvent);

  socket.on('userTypingEnded', userTypingEndedEvent);

  socket.on('disconnect', disconnectedEvent);
};

export default handleIO;
