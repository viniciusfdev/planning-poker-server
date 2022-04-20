import { Server, ServerOptions } from 'socket.io';
import { SocketData } from './types/connection.type';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from './types/event.type';
import app from './app';

function initialize(options?: Partial<ServerOptions>) {
  return app(
    new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(options),
  );
}

const PORT = Number(process.env.PORT) || 9000;
const App = initialize({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
App.listen(PORT);
