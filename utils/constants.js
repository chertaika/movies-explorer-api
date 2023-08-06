const SUCCESS_CODE_200 = 200;
const SUCCESS_CODE_201 = 201;
const ERROR_CODE_400 = 400;
const ERROR_CODE_403 = 403;
const ERROR_CODE_404 = 404;
const ERROR_CODE_409 = 409;
const ERROR_CODE_401 = 401;
const ERROR_CODE_500 = 500;
const INCORRECT_USER_DATA_MESSAGE = 'Переданы некорректные данные пользователя';
const INCORRECT_ADD_USER_DATA_MESSAGE = 'Переданы некорректные данные при создании пользователя';
const INCORRECT_UPDATE_USER_DATA_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
const INCORRECT_DATA_MESSAGE = 'Переданы некорректные данные';
const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм с указанным _id не найден';
const DATA_NOT_FOUND_MESSAGE = 'Данные не найдены';
const NOT_UNIQUE_EMAIL_ERROR_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
const INVALID_AUTH_DATA_ERROR_MESSAGE = 'Неправильные почта или пароль';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const NO_RIGHTS_TO_DELETE_ERROR_MESSAGE = 'Нет прав на удаление этого фильма';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  SUCCESS_CODE_200,
  SUCCESS_CODE_201,
  ERROR_CODE_400,
  ERROR_CODE_403,
  ERROR_CODE_500,
  ERROR_CODE_404,
  ERROR_CODE_409,
  ERROR_CODE_401,
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
  INCORRECT_ADD_USER_DATA_MESSAGE,
  NOT_UNIQUE_EMAIL_ERROR_MESSAGE,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  DATA_NOT_FOUND_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  NO_RIGHTS_TO_DELETE_ERROR_MESSAGE,
};
