const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INVALID_AUTH_DATA_ERROR_MESSAGE, INCORRECT_EMAIL } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: INCORRECT_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const checkData = (data) => {
  if (!data) throw new UnauthorizedError(INVALID_AUTH_DATA_ERROR_MESSAGE);
};

userSchema.statics.findUserByCredentials = async function checkUserData(email, password) {
  const user = await this.findOne({ email }).select('+password');
  checkData(user);

  const matched = await bcrypt.compare(password, user.password);
  checkData(matched);

  return user;
};

module.exports = mongoose.model('user', userSchema);
