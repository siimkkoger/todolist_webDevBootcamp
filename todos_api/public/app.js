//let db = require('../models/index.js');
$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(function (event) {
        if(event.which === 13){
            createTodo();
        }
    });

    $('.list').on('click', 'li', function () {
        updateTodo($(this));
    });

    $('.list').on('click', 'span', function (event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    });

});

function addTodos(todos) {
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}

function addTodo(todo){
    let newTodo = $('<li class="task">' + todo.name + '<span>X</span>' + '</li>');
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo() {
    let userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
        .then((todo) => {
            $('#todoInput').val('');
            addTodo(todo)
        })
        .catch((err) => console.log(err));
}

function removeTodo(todo) {
    console.log(todo.data());
    let clickedId = todo.data('id');
    let deleteUrl = `/api/todos/${clickedId}`;

    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
        .then(function (data) {
            console.log("--------");
            todo.remove();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function updateTodo(todo) {
    let clickedId = todo.data('id');
    let updateUrl = `/api/todos/${clickedId}`;
    let isDone = todo.data("completed");
    let updateData = {completed: !isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
        .then(function (updatedTodo) {
            todo.toggleClass("done");
            todo.data("completed", !isDone);
        })
}

