var express = require("express");
var router = express.Router();
let mongoose = require('mongoose');

//connect with event

let Event = require('../models/event');

let EventController = require('../controller/event')
/* Get route for the Events list */

// helper function
function requireAuth(req,res,next){
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

// Read Operation
router.get('/',EventController.DislayEventlist);
/* Get route for Add Event page --> Create */
router.get('/add', requireAuth, EventController.AddEvent); 
/* Post route for Add Event page --> Create */
router.post('/add', requireAuth, EventController.ProcessEvent);
/* Get route for displaying the Edit Event page --> Update */
router.get('/edit/:id', requireAuth, EventController.EditEvent);
/* Post route for processing the Edit Event page --> Update */
router.post('/edit/:id',requireAuth, EventController.ProcessEditEvent);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, EventController.DeleteEvent);
 module.exports = router;
    