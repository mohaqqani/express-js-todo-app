import express from 'express';

//import controller file
import * as todoController from '../controllers/todo-controller';
import * as todoListController from "../controllers/todo-list.controller";

// get an instance of express router
const router = express.Router();

router.route('/')
    .get(todoListController.getTodoLists)
    .post(todoListController.addTodoList)
    .put(todoListController.updateTodoList);

router.route('/:id')
    .get(todoListController.getTodoList)
    .delete(todoListController.deleteTodoList);


export default router;
