import React from 'react'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from './views/Home/Home'
import CompletedList from './views/CompletedList/CompletedList'
import CreateEdit from './views/CreateEdit/CreateEdit'
import TodoTrash from './views/TodoTrash/TodoTrash'

const routes = {
    home: "/",
    createEdit: "/create-edit",
    completeList: "/completed-list",
    todoTrash: "/todo-trash"
}

const AppRouter = () => {

    const todo: ToDo[] = [
        {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: false},
        {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
    ];

    localStorage.setItem("todo", JSON.stringify(todo));
    localStorage.setItem("trash", "[]");

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={routes.home}>Home</Link>
                        </li>
                        <li>
                            <Link to={routes.createEdit}>Create/Edit</Link>
                        </li>
                        <li>
                            <Link to={routes.completeList}>Completed List</Link>
                        </li>
                        <li>
                            <Link to={routes.todoTrash}>Trash</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Route path={routes.home} exact component={Home}/>
            <Route path={`${routes.createEdit}/:action?/:id?`} component={CreateEdit}/>
            <Route path={routes.completeList} component={CompletedList}/>
            <Route path={routes.todoTrash} component={TodoTrash}/>
        </Router>
    )
}


export default AppRouter;
