const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 60 * 1000, // 1 минута
  max: 100,
  message: 'Превышено количество запросов на сервер. Пожалуйста, повторите позже',
});

module.exports = limiter;
