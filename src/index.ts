import { createServer } from 'http';

const PORT = process.env.PORT || 9000;
const http = createServer();

http.listen(PORT, () => console.log('Server listening at', PORT));
