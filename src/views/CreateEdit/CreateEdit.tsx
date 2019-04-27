import React from 'react';
import './CreateEdit.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import CreateTodo from './CreateTodo/CreateTodo'
import EditTodo from './EditTodo/EditTodo'

interface ToDo {
    id: number,
    todo: string
}


const routes = {
    create: "/create-edit/create",
    edit: "/create-edit/edit"
}

const todo: ToDo[] = [
    {id: 1, todo: "fix routes"},
    {id: 2, todo: "do localstorage"}
]

class CreateEdit extends React.PureComponent<{}, {}> {

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to={routes.create}>Create</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <h3>List of todo</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Todo</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            todo.map((item: ToDo) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.todo}</td>
                                        <td><Link to={`${routes.edit}/${item.id}`}>edit</Link> | delete</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <Route path={routes.create} exact component={CreateTodo}/>
                <Route path={`${routes.edit}/:todoId`} exact component={EditTodo}/>
            </Router>
        );
    }

}

export default CreateEdit
