import io from 'socket.io';
import { createServer } from 'http';
import { NextFunction } from 'express';
import * as session from './resources/middleware/session';
import app from './app';
import database from './sequelize';
import handleIO from './resources/socket/socket.controller';

(async (): Promise<void> => {
  await database.sync();

  const port = process.env.SERVER_PORT;
  const httpServer = createServer(app).listen(port, () =>
    console.info(`Server running on port ${port}`)
  );

  const socketIo = io.listen(httpServer);

  socketIo.use((socket: io.Socket, next: NextFunction) => {
    session.getMiddleware()(socket.request, socket.request.res, next);
  });

  socketIo.on('connection', handleIO(socketIo));
})();
