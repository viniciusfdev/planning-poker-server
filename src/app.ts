import { errorHandler as onError } from './common/errors';
import {
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
    socket.on('error', onError);
    socket.on('disconnect', () => onDisconnect(socket, app));
    socket.on('disconnecting', () => onDisconnecting(socket, app));
    socket.on('create-room', () => onCreateRoom(socket, app));
    socket.on('enter-room', () => onEnterRoom(socket, app));
    socket.on('setup-room', () => onSetupRoom(socket, app));
    socket.on('vote-room', () => onVoteRoom(socket, app));
    socket.on('reveal-room', () => onRevealRoom(socket, app));
    socket.on('reset-room', () => onResetRoom(socket, app));
  });

  return app;
}
