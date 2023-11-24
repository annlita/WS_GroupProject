//* Creating routes *//

let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');
/* GET home page. */
router.get('/', indexController.displayHomePage );

/* GET home page. */
router.get('/home', indexController.displayHomePage );


/* GET faculties page. */
router.get('/faculties', indexController.displayFacultiesPage );


/* GET feeback page. */
router.get('/feedback', indexController.displayFeedbackPage);

module.exports = router;
