const router = require('express').Router();

const { logout } = require('../controllers/user');

router.post('/', logout);
module.exports = router;
