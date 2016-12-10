var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    description: String,
    date: Date
}, { collection: 'checklist' }); //Creates a schema for documents in the checklist collection

var ListItem = mongoose.model("ListItem", listSchema);

module.exports = ListItem;