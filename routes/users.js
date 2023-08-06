const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidation } = require('../utils/validation');

router.get('/me', getCurrentUser);

router.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
