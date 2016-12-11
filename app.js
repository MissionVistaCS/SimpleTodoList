var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var http = require('http');

var app = express();

mongoose.connect("mongodb://localhost:27017/list"); //Connects to database list
var ListItem = require("./models/ListItem");

app.set('view engine', 'ejs');

app.use(logger('dev')); //Logs info

app.get('/', function(request, response, next) {
    var description = request.query.description; //Description value in GET request
    if (description) {
        var newItem = new ListItem({ description: description, date: new Date() });
        newItem.save(next); //When the new entry is finished saving, run next() to move on to next middleware
    } else {
        next();
    }
});

app.get('/', function (request, response) {
    ListItem.find().sort({ createdAt: 'ascending' }).exec(function (err, list) { //Gets the list of entries from the collection. When finished, exec will be called
        response.render('index', { list: list }); //Passes in the array 'list' when rendering index.html, this data will be handled in the EJS file
    });
});

app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Looks like you didn't find a file.");
});

http.createServer(app).listen(3000); //Starts the server
