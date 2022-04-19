import { Logger } from '../common/log';
import { AppEventHandler } from '../types/connection.type';

export function registerMiddlewares([event]: [any, ...any], next: Function) {
  Logger.trace('Receive event', event);
  next();
}

export const onConnection: AppEventHandler = (socket, io) => {
  Logger.trace('onConnection', socket.id);
};

export const onDisconnect: AppEventHandler = (socket, io) => {
  Logger.trace('onDisconnect', socket.id);
};

export const onDisconnecting: AppEventHandler = (socket, io) => {
  Logger.trace('onDisconnecting', socket.id);
};

/**
 * Used to create a room.
 * - Setup admin
 * - Setup room
 */
export const onCreateRoom: AppEventHandler = (socket, io) => {
  Logger.trace('onCreateRoom', socket.id);
};

/**
 * Use to enter a room.
 */
export const onEnterRoom: AppEventHandler = (socket, io) => {
  Logger.trace('onEnterRoom', socket.id);
};

/**
 * Used to configure the room.
 * - Room name
 * - Room issue
 * - Room history
 */
export const onSetupRoom: AppEventHandler = (socket, io) => {
  Logger.trace('onSetupRoom', socket.id);
};

/**
 * Create or update room vote.
 */
export const onVoteRoom: AppEventHandler = (socket, io) => {
  Logger.trace('onVoteRoom', socket.id);
};

/**
 * Broadcast all room votes.
 */
export const onRevealRoom: AppEventHandler = (socket, io) => {
  Logger.trace('onRevealRoom', socket.id);
};

/**
 * Reset room state.
 * - Erase issue
 * - Erase votes
 * - Erase vote result
 */
export const onResetRoom: AppEventHandler = (socket, io) => {
  Logger.trace('onResetRoom', socket.id);
};
