const { NODE_ENV } = require('../constants');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: 'Internal Server Error',
    ...(NODE_ENV === 'development' && { error: err.message })
  });
};

module.exports = errorHandler;