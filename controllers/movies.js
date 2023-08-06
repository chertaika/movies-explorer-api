const { Error: { ValidationError, CastError } } = require('mongoose');
const Movie = require('../models/movie');
const {
  NO_RIGHTS_TO_DELETE_ERROR_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  SUCCESS_CODE_201,
} = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const checkData = (data) => {
  if (!data) throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
};

module.exports.getMovies = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.find({ owner: userId }).populate('owner');
    return res.send(movies);
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(new BadRequestError(INCORRECT_DATA_MESSAGE));
    }
    return next(error);
  }
};

module.exports.addMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner,
    });
    await movie.populate('owner');
    return res.status(SUCCESS_CODE_201).send(movie);
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(new BadRequestError(INCORRECT_DATA_MESSAGE));
    }
    return next(error);
  }
};

module.exports.deleteMovieById = async (req, res, next) => {
  try {
    const { _id: movieId } = req.params;
    const movie = await Movie.findById(movieId);
    checkData(movie);

    const ownerId = movie.owner.valueOf();
    const userId = req.user._id;
    if (ownerId !== userId) {
      return next(new ForbiddenError(NO_RIGHTS_TO_DELETE_ERROR_MESSAGE));
    }

    await movie.deleteOne();
    return res.send(movie);
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError(INCORRECT_DATA_MESSAGE));
    }
    return next(error);
  }
};
