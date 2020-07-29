//import models
import Todo from '../models/todo.model';

// import Utils and Helpers
import PrintLog from "../utils/req-body-logger";
import TodoList from "../models/todo-lists.model";

export const getTodos = (req, res) => {
    Todo.find({ list: req.query.list }).populate('list').exec((err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            return res.json({ 'success': true, 'message': 'Todos fetched successfully', todos: todo });
        }
    });
}

export const addTodo = (req, res) => {
    PrintLog('addTodo', req.body);
    const newTodoList = new Todo(req.body);
    newTodoList.save((err, todo) => {
        if (err) {
            console.error(err);
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            return res.json({ 'success': true, 'message': 'Todo added successfully', todo: todo });
        }
    });
}

export const updateTodo = (req, res) => {
    Todo.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        } else {
            return res.json({ 'success': true, 'message': 'Updated successfully', todoList: todo });
        }
    });
}

export const getTodo = (req, res) => {
    Todo.find({ _id: req.params.id }).populate('list').exec((err, Todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            if (Todo.length) {
                return res.json({ 'success': true, 'message': 'Todo fetched by id successfully', todo: Todo });
            } else {
                return res.json({ 'success': false, 'message': 'Todo with the given id not found' });
            }
        }
    });
}

export const deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            return res.json({ 'success': true, 'message': todo.text + ' deleted successfully' });
        }
    });
}
