const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { PORT, API_PREFIX } = require('./constants');
const errorHandler = require('./middleware/error.handler');
const notFoundHandler = require('./middleware/notFound.handler');
const apiRoutes = require('./routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use(API_PREFIX, apiRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Close the server & exit process
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Close the server & exit process
  server.close(() => process.exit(1));
});