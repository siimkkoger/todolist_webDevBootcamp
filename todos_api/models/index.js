let mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo_api');

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");