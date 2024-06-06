const TodoModel = require('../models/todo');

// Create and Save a new ToDo
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.description && !req.body.status) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const todo = new TodoModel({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });
    
    await todo.save().then(data => {
        res.send({
            message: "ToDo created successfully!!",
            todo: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ToDo"
        });
    });
};

// Retrieve all ToDos from the database.
exports.findAll = async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single ToDo with an id
exports.findOne = async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        res.status(200).json(todo);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a ToDo by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await TodoModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `ToDo not found.`
            });
        } else {
            res.send({ message: "ToDo updated successfully." });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a ToDo with the specified id in the request
exports.destroy = async (req, res) => {
    await TodoModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `ToDo not found.`
            });
        } else {
            res.send({
                message: "ToDo deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
