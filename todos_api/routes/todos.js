let express = require('express');
let router = express.Router();
let db = require('../models/index.js');
let helper = require('../helpers/todos.js');

router.get('/', helper.getTodos);

router.post('/', helper.createTodo);

router.get('/:todoId', helper.getTodo);

router.put('/:todoId', helper.changeTodo);

router.delete('/:todoId', helper.deleteTodo);

module.exports = router;