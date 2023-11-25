var express = require("express");
var router = express.Router();
let mongoose = require('mongoose');

//connect with event

let Event = require('../models/event');

let EventController = require('../controller/event')
/* Get route for the Bio Events list */
// Read Operation
router.get('/',EventController.DislayEventlist);
/* Get route for Add Event page --> Create */
router.get('/add',EventController.AddEvent); 
/* Post route for Add Event page --> Create */
router.post('/add',EventController.ProcessEvent);
/* Get route for displaying the Edit Event page --> Update */
router.get('/edit/:id',EventController.EditEvent);
/* Post route for processing the Edit Event page --> Update */
router.post('/edit/:id',EventController.ProcessEditEvent);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id',EventController.DeleteEvent);
 module.exports = router;
    