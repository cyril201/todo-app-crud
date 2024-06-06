const express = require('express');
const TodoController = require('../controller/todoController'); // Change the import to the ToDo controller
const router = express.Router();

router.get('/', TodoController.findAll);
router.get('/:id', TodoController.findOne);
router.post('/', TodoController.create);
router.patch('/:id', TodoController.update);
router.delete('/:id', TodoController.destroy);

module.exports = router;
