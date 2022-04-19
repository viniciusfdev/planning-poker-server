export type IOEvents = 'connection' | 'connection_error';

export type AppSocketEvents =
  | 'disconnecting'
  | 'disconnect'
  | 'error'
  | 'create-room'
  | 'enter-room'
  | 'setup-room'
  | 'vote-room'
  | 'reset-room'
  | 'reveal-room';

export type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
};

export type ClientToServerEvents = {
  [eventName in AppSocketEvents]: () => void;
};

export type InterServerEvents = {
  ping: () => void;
};
