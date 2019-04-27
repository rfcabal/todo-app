import React from 'react'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from './views/Home/Home'
import CompletedList from './views/CompletedList/CompletedList'
import CreateEdit from './views/CreateEdit/CreateEdit'
import TodoTrash from './views/TodoTrash/TodoTrash'


// FIXME: Fix routes with query params should be with Link not with Href
const routes = {
    home: "/",
    createEdit: "/create-edit",
    completeList: "/completed-list",
    todoTrash: "/todo-trash"
}

const AppRouter = () => {
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
            <Route path={routes.createEdit} component={CreateEdit}/>
            <Route path={routes.completeList} component={CompletedList}/>
            <Route path={routes.todoTrash} component={TodoTrash}/>
        </Router>
    )
}


export default AppRouter;
