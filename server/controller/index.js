let express = require('express');
let router = express.Router();

/* Display home page */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
  };

  /* Display faculties page */
  module.exports.displayFacultiesPage = (req, res, next) => {
    res.render('index', { title: 'Faculties' });
  };

  /* Display feedback page */
  module.exports.displayFeedbackPage = (req, res, next) => {
    res.render('index', { title: 'Feedback' });
  };