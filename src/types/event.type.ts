export type IOEvents = 'connection' | 'connection_error';

export type ServerSocketEvents =
  | 'disconnecting'
  | 'disconnect'
  | 'error'
  | 'create-room'
  | 'enter-room'
  | 'setup-room'
  | 'vote-room'
  | 'reset-room'
  | 'reveal-room'
  | 'close-room';

export type ClientSocketEvents = 'room-updated' | 'room-expiration' | 'room-closed';

export type ServerToClientEvents = {
  [eventName in ClientSocketEvents]: (...any: any) => void;
};

export type ClientToServerEvents = {
  [eventName in ServerSocketEvents]: (...any: any) => void;
};

export type InterServerEvents = {
  ping: () => void;
};
