import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from './event.type';

export type SocketData = string;

export type AppServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

/**
 * Handle with an socket event .
 */
export type AppEventHandler<T = any> = (
  /**
   * A Socket is the fundamental class for interacting with the client. It inherits all the methods of the Node.js EventEmitter, like emit, on, once or removeListener. Contains information about the socket, like data, id and expose Socket event methods.
   */
  socket: AppSocket,
  /**
   * Any other custom args for an event handler
   */
  args: T,
  /**
   * The Server instance (often called io in the code examples) has a few attributes that may be of use in your application. It also inherits all the methods of the main namespace, like namespace.use() (see here) or namespace.allSockets().
   */
  io: AppServer,
) => void;

export type AppSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
