require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { router } = require('./routes');

const app = express();
const {
  PORT = 3001,
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
} = process.env; // Слушаем 3000 порт, подключаем базу данных

mongoose.connect(`${MONGO_URL}`)
  .then(() => console.log('база данных подключена'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());
app.use(requestLogger); // подключаем логгер запросов
// app.use(cookieParser());

app.use(helmet());
app.get ("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадет")
  }, 0);
});
console.log("crash-test")
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
