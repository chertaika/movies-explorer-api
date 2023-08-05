const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signout', auth, logout);

router.use('/users', auth, usersRouter);

router.use('/cards', auth, cardsRouter);

router.all('*', (req, res, next) => next(new NotFoundError('Неверный URL запроса')));

module.exports = router;
