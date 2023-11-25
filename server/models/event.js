const { name } = require('ejs');
let mongoose = require('mongoose');
//create a course model
//schema for database
let Events = mongoose.Schema({
    Name: String,
    Time: String,
    Date: String,
    Location: String,
    Description: String

},{
    collection: "events"
}
);
module.exports = mongoose.model('Event',Events);