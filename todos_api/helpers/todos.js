let db = require('../models');

exports.getTodos = function (req, res) {
    db.Todo.find()
        .then((todos) => res.json(todos))
        .catch((err) => res.send(err))
};

exports.createTodo = function (req, res) {
    db.Todo.create(req.body)
        .then((newTodo) => res.json(newTodo))
        .catch((err) => res.send(err));
};

exports.getTodo = function (req, res) {
    db.Todo.findById(req.params.todoId)
        .then((foundTodo) => res.json(foundTodo))
        .catch((err) => res.send(err));
};

exports.changeTodo = function (req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId},
        req.body, {new: true})
        .then((todo) => res.json(todo))
        .catch((err) => res.send(err));
};

exports.deleteTodo = function (req, res) {
    db.Todo.remove({_id: req.params.todoId})
        .then((todo) => res.status(200).json({message: "deleted"}, todo))
        .catch((err) => res.send(err));
};

module.exports = exports;