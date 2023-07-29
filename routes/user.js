const router = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/user');

const { validationUpdateUser } = require('../middlewares/validations');

router.get('/me', getUser);

router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
