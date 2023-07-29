const router = require('express').Router();

const userRoutes = require('./user');
const movieRoutes = require('./movie');
const logout = require('./logout');

router.use('/logout', logout);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
