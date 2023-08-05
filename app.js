const express = require('express');
const mongoose = require('mongoose');
const { DB_URI, PORT } = require('./utils/config');

const app = express();

(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Соединение с базой данных установлено');
  } catch (error) {
    console.log(`Ошибка соединения с базой данных ${error.message}`);
  }
})();

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
