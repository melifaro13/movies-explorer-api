const router = require('express').Router();

const userRoutes = require('./user');
const movieRoutes = require('./movie');
const logout = require('./logout');

router.use('/logout', logout);
router.use('/user', userRoutes);
router.use('/movie', movieRoutes);

module.exports = router;
