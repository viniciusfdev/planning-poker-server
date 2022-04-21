import { errorHandler as onError } from './common/errors';
import { Logger } from './common/log';
import {
  onCloseRoom,
  onConnection,
  onCreateRoom,
  onDisconnect,
  onDisconnecting,
  onEnterRoom,
  onResetRoom,
  onRevealRoom,
  onSetupRoom,
  onVoteRoom,
} from './controllers/connection.controller';
import { AppServer, AppSocket } from './types/connection.type';

export default function (app: AppServer): AppServer {
  app.on('connection', (socket: AppSocket) => {
    onConnection(socket, undefined, app);
    socket.on('error', onError);
    socket.on('disconnect', (reason) => onDisconnect(socket, { reason }, app));
    socket.on('disconnecting', (reason) => onDisconnecting(socket, { reason }, app));
    socket.on('create-room', (args) => onCreateRoom(socket, args, app));
    socket.on('enter-room', (args) => onEnterRoom(socket, args, app));
    socket.on('setup-room', (args) => onSetupRoom(socket, args, app));
    socket.on('vote-room', (args) => onVoteRoom(socket, args, app));
    socket.on('reveal-room', (args) => onRevealRoom(socket, args, app));
    socket.on('reset-room', (args) => onResetRoom(socket, args, app));
    socket.on('close-room', (args) => onCloseRoom(socket, args, app));
  });

  return app;
}
