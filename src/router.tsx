import React from 'react'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from './views/Home/Home'
import CompletedList from './views/CompletedList/CompletedList'
import CreateEdit from './views/CreateEdit/CreateEdit'
import TodoTrash from './views/TodoTrash/TodoTrash'

interface Routes {
    name: string,
    path: string,
    component: string,
}

const routes: Routes[] = [
    {name: "Home", path: "/", component: "Home"},
    {name: "Create/Edit", path: "/create-edit", component: "CreateEdit"},
    {name: "Completed List", path: "/completed-list", component: "CompletedList"},
    {name: "Trash", path: "/todo-trash", component: "TodoTrash"},
]

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
                        {
                            routes.map((route: Routes) => {
                                return (
                                    <li key={route.component}>
                                        <Link to={route.path}>{route.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
            <Route path={routes[0].path} exact component={Home}/>
            <Route path={`${routes[1].path}/:action?/:id?`} component={CreateEdit}/>
            <Route path={routes[2].path} component={CompletedList}/>
            <Route path={routes[3].path} component={TodoTrash}/>
        </Router>
    )
}


export default AppRouter;
