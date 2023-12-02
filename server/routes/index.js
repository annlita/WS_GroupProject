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

/* GET login page. */
router.get('/login', indexController.displayLoginPage);
/* POST login page. */
router.post('/login', indexController.processLoginPage);

/* GET register page. */
router.get('/register', indexController.displayRegisterPage);
/* POST register page. */
router.post('/register', indexController.processRegisterPage);

/* GET logout page. */
router.get('/logout', indexController.preformLogoutPage);

module.exports = router;
