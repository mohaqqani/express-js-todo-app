//import models
import TodoList from '../models/todo-lists.model';

// import Utils and Helpers
import PrintLog from '../utils/req-body-logger';

export const getTodoLists = (req, res) => {
    TodoList.find().populate('owner contributors').exec((err, todoLists) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            return res.json({ 'success': true, 'message': 'Todos fetched successfully', todos: todoLists });
        }
    });
}

export const addTodoList = (req, res) => {
    PrintLog('addTodoList', req.body);
    const newTodoList = new TodoList(req.body);
    if (newTodoList.contributors.length < 1){
        newTodoList.contributors.push(newTodoList.owner);
    }
    newTodoList.save((err, todoList) => {
        if (err) {
            console.error(err);
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            return res.json({ 'success': true, 'message': 'Todo added successfully', todo: todoList });
        }
    });
}

export const updateTodoList = (req, res) => {
    TodoList.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, todoList) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        } else {
            return res.json({ 'success': true, 'message': 'Updated successfully', todoList: todoList });
        }
    });
}

export const getTodoList = (req, res) => {
    TodoList.find({ _id: req.params.id }).populate('owner contributors').exec((err, todoList) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            if (todoList.length) {
                return res.json({ 'success': true, 'message': 'Todo fetched by id successfully', todo: todoList });
            } else {
                return res.json({ 'success': false, 'message': 'Todo with the given id not found' });
            }
        }
    });
}

export const deleteTodoList = (req, res) => {
    TodoList.findByIdAndRemove(req.params.id, (err, todoList) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            return res.json({ 'success': true, 'message': todoList.title + ' deleted successfully' });
        }
    });
}
