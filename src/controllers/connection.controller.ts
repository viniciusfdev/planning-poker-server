import Rooms from '../business/rooms';
import { throwMissingRequiredAttributes } from '../common/errors';
import { Logger } from '../common/log';
import { AppEventHandler } from '../types/connection.type';
import { Issue, Room } from '../types/room.type';

export function registerMiddlewares([event]: [any, ...any], next: (any?: any) => void) {
  Logger.info('Receive event', event);
  next();
}

export const onConnection: AppEventHandler<undefined> = (socket, _, io) => {
  Logger.info('onConnection', socket.id);
};

export const onDisconnect: AppEventHandler = (socket, _, io) => {
  Logger.info('onDisconnect', socket.id);
};

/**
 * Check the socket rooms.
 * - If the room is empty, delete the room.
 */
export const onDisconnecting: AppEventHandler = (socket, _, io) => {
  Logger.info('onDisconnecting', socket.id);
  const [__, ...rooms] = Array.from(socket.rooms);

  for (const roomId of rooms) {
    const clients = io.sockets.adapter.rooms.get('Room Name');
    const numClients = (clients ? clients.size : 0) - 1;

    if (numClients <= 0) {
      Rooms.delete(roomId);
    } else {
      const room = Rooms.leave(roomId, socket.id);
      socket.to(roomId).emit('room-updated', { room });
    }
  }
};

/**
 * Used to create a room.
 * - Setup admin
 * - Setup room
 */
export const onCreateRoom: AppEventHandler<{ roomName: string; memberName: string }> = (
  socket,
  args,
  io,
) => {
  Logger.info('onCreateRoom', socket.id);
  throwMissingRequiredAttributes(args, ['roomName', 'memberName']);
  const room = Rooms.create(args.roomName, socket.id, args.memberName);
  socket.data = args.memberName;
  socket.join(room.id);
  socket.emit('room-updated', { room });
};

/**
 * Use to enter a room.
 */
export const onEnterRoom: AppEventHandler<{ roomId: string; memberName: string }> = (
  socket,
  args,
  io,
) => {
  Logger.info('onEnterRoom', socket.id);
  throwMissingRequiredAttributes(args, ['roomId', 'memberName']);
  const room = Rooms.enter(args.roomId, socket.id, args.memberName);
  socket.data = args.memberName;
  socket.join(room.id);
  io.to(room.id).emit('room-updated', { room });
};

/**
 * Used to configure the room.
 * - Room name
 * - Room issue
 * - Room status
 */
export const onSetupRoom: AppEventHandler<{
  roomId: string;
  config: { name?: string; issue: Issue; status: Room['status'] };
}> = (socket, args, io) => {
  Logger.info('onSetupRoom', socket.id);
  throwMissingRequiredAttributes(args, ['roomId', 'config']);
  const room = Rooms.update(args.roomId, args.config);
  io.to(room.id).emit('room-updated', { room });
};

/**
 * Create or update room vote.
 */
export const onVoteRoom: AppEventHandler<{ roomId: string; vote: number }> = (socket, args, io) => {
  Logger.info('onVoteRoom', socket.id);
  throwMissingRequiredAttributes(args, ['roomId', 'vote']);
  const room = Rooms.vote(args.roomId, socket.id, args.vote);
  io.to(room.id).emit('room-updated', { room });
};

/**
 * Broadcast all room votes.
 */
export const onRevealRoom: AppEventHandler<{ roomId: string }> = (socket, args, io) => {
  Logger.info('onRevealRoom', socket.id);
  throwMissingRequiredAttributes(args, ['roomId']);
  const room = Rooms.update(args.roomId, { status: 'counting' });
  io.to(room.id).emit('room-updated', { room });
};

/**
 * Reset room state.
 * - Erase issue
 * - Erase votes
 * - Erase vote result
 */
export const onResetRoom: AppEventHandler = (socket, args, io) => {
  Logger.info('onResetRoom', socket.id);
  throwMissingRequiredAttributes(args, ['roomId']);
  const room = Rooms.update(args.roomId, { issue: undefined, votes: {} });
  io.to(room.id).emit('room-updated', { room });
};
