const router = require('express').Router();
const { getMovies, addMovie, deleteMovieById } = require('../controllers/movies');
const { addMovieValidation, deleteMovieValidation } = require('../utils/validation');

router.get('/', getMovies);

router.post('/', addMovieValidation, addMovie);

router.delete('/:_id', deleteMovieValidation, deleteMovieById);

module.exports = router;
