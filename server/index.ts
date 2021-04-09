import http from 'http';
import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import { MongoDatabase } from './shared/helpers/database';
import routes from './routes';

// Initialize environment properties
require('custom-env').env();

// Create the express application
const app = express();

// Enable Cross Origin
app.use(cors());
// Parse requests of content-type - application/json
app.use(json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Initialize database
MongoDatabase.init();

// Include API routes
app.use(routes);

// If there is an specific port for the API, use it.
// Otherwise use the global one, and in last instance, the default one.
const port = process.env.API_PORT || process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

/**
 * Gracefully shutdown the server, closing all existing connections
 */
async function shutdown() {
    console.log('Received kill signal, shutting down gracefully');

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    await MongoDatabase.close();

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });
}
