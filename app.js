const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { DB_URI, PORT } = require('./utils/config');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Соединение с базой данных установлено');
  } catch (error) {
    console.log(`Ошибка соединения с базой данных ${error.message}`);
  }
})();

const app = express();

const allowedCors = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 100,
  message: 'Превышено количество запросов на сервер. Пожалуйста, повторите позже',
});

app.use(cors(corsOptions));

app.use(helmet());

app.use(limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
