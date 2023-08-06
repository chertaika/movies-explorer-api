const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { registerUser, login, logout } = require('../controllers/users');
const { registerUserValidation, loginValidation } = require('../utils/validation');

router.post('/signup', registerUserValidation, registerUser);

router.post('/signin', loginValidation, login);

router.post('/signout', auth, logout);

router.use('/users', auth, usersRouter);

router.use('/movies', auth, moviesRouter);

router.all('*', (req, res, next) => next(new NotFoundError('Неверный URL запроса')));

module.exports = router;
