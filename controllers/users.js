const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error: { ValidationError, CastError } } = require('mongoose');
const User = require('../models/user');

const {
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
  INCORRECT_ADD_USER_DATA_MESSAGE,
  NOT_UNIQUE_EMAIL_ERROR_MESSAGE,
  SUCCESS_CODE_201,
} = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const { SECRET_KEY } = require('../utils/config');

const checkData = (data) => {
  if (!data) throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    checkData(user);
    return res.send(user);
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError(INCORRECT_USER_DATA_MESSAGE));
    }
    return next(error);
  }
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hash,
    });
    user = user.toObject();
    delete user.password;
    return res.status(SUCCESS_CODE_201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictingRequestError(NOT_UNIQUE_EMAIL_ERROR_MESSAGE));
    }
    if (error instanceof ValidationError) {
      return next(new BadRequestError(INCORRECT_ADD_USER_DATA_MESSAGE));
    }
    return next(error);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(_id, { name, email }, {
      new: true,
      runValidators: true,
    });
    checkData(user);
    return res.send(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(new BadRequestError(INCORRECT_UPDATE_USER_DATA_MESSAGE));
    }
    return next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { _id: userId } = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: userId },
      SECRET_KEY,
      { expiresIn: '7d' },
    );
    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
      .send({ _id: userId });
  } catch (error) {
    return next(error);
  }
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    return res.send({ message: 'Вы вышли из аккаунта' });
  } catch (error) {
    return next(error);
  }
};
