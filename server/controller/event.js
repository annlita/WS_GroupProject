let express = require('express');
let router = express.Router();
let Event = require('../models/event');

// Display the list of events
module.exports.DislayEventlist = async (req, res, next) => {
    try {
        // Fetch the list of Events from the database
        const EventList = await Event.find();

        // Render the 'list' view with the retrieved Event data
        res.render('event/list', {
            title: 'Event List',
            EventList: EventList
        });
    } catch (err) {
        console.error(err);
        // Handle errors and render the 'list' view with an error message
        res.render('event/list', {
            error: 'Error on the server'
        });
    }
};

// Render the form to add a new event
module.exports.AddEvent = async (req, res, next) => {
    try {
        res.render('event/add', {
            title: 'Add Event'
        });
    } catch (err) {
        console.error(err);
        res.render('event/list', {
            error: 'Error on the server'
        });
    }
};

// Process the form data to add a new event
module.exports.ProcessEvent = async (req, res, next) => {
    try {
        // Create a new Event instance with data from the form
        let newEvent = Event({
            "Name": req.body.Name,
            "Time": req.body.Time,
            "Date": req.body.Date,
            "Location": req.body.Location,
            "Description": req.body.Description,
            
        });

        // Save the new event to the database and redirect to the event list
        Event.create(newEvent).then(() => {
            res.redirect('/event-list');
        });
    } catch (error) {
        console.error(err);
        res.render('event/list', {
            error: 'Error on the server'
        });
    }
};

// Render the form to edit an existing event
module.exports.EditEvent = async (req, res, next) => {
    try {
        // Retrieve the Event to edit from the database using the provided ID
        const id = req.params.id;
        const eventToEdit = await Event.findById(id);

        // Render the 'edit' view with the retrieved Event data
        res.render('event/edit', {
            title: 'Edit Event',
            Event: eventToEdit
        });
    } catch (error) {
        console.error(err);
        res.render('event/list', {
            error: 'Error on the server'
        });
    }
};

// Process the form data to edit an existing event
module.exports.ProcessEditEvent = (req, res, next) => {
    try {
        const id = req.params.id;

        // Create an updated Event instance with data from the form
        let updatedEvent = Event({
            "_id":id,
            "Name": req.body.Name,
            "Time": req.body.Time,
            "Date": req.body.Date,
            "Location": req.body.Location,
            "Description": req.body.Description,
        });

        // Update the event in the database and redirect to the event list
        Event.findByIdAndUpdate(id, updatedEvent).then(() => {
            res.redirect('/event-list');
        });
    } catch (error) {
        console.error(err);
        res.render('event/list', {
            error: 'Error on the server'
        });
    }
};

// Delete a event
module.exports.DeleteEvent = (req, res, next) => {
    try {
        let id = req.params.id;

        // Delete the Event from the database and redirect to the Event list
        Event.deleteOne({ _id: id }).then(() => {
            res.redirect('/event-list');
        });
    } catch (error) {
        console.error(err);
        res.render('event/list', {
            error: 'Error on the server'
        });
    }
}
