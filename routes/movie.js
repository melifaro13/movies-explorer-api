const router = require('express').Router();

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

const { validationCreateMovie, validationMovieId } = require('../middlewares/validations');

router.get('/', getAllMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = router;
