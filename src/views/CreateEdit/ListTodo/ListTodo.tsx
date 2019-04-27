import React from 'react';
import './ListTodo.css';
import {Link} from "react-router-dom";

interface ToDo {
    id: number,
    todo: string,
    dueDate: Date,
    completed: Boolean,
    completedDate?: Date
}

interface CreateEditProps {
    todoList: ToDo[]
}

class ListTodo extends React.PureComponent<CreateEditProps, {}> {

    render() {
        const {todoList} = this.props

        return todoList && todoList.length > 0 ? (
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
                        todoList.map((item: ToDo) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.todo}</td>
                                    <td><Link to={`/create-edit/edit/${item.id}`}>edit</Link> | delete</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        ) : (<div>You haven't added a todo yet.</div>);
    }

}

export default ListTodo
