const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');
const { SECRET_KEY } = require('../utils/config');

const handleAuthError = () => {
  throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
};

module.exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      handleAuthError();
    }

    let payload;
    try {
      payload = jwt.verify(
        token,
        SECRET_KEY,
      );
    } catch (err) {
      handleAuthError();
    }
    req.user = payload;
    return next();
  } catch (error) {
    return next(error);
  }
};
