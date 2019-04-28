import React from 'react';
import './ListTodo.css';
import {Link} from "react-router-dom";

interface ListTodoProps {
    todoList: ToDo[]
    view: string,
    onChangeTodoList: Function
}

class ListTodo extends React.Component<ListTodoProps> {

    componentDidUpdate() {
        console.log(this.props)
    }

    handleTodoListChange(id: number, action: string) {
        this.props.onChangeTodoList(id, action);
    }

    render() {
        const {todoList, view} = this.props

        return todoList && todoList.length > 0 ? (
            <div>
                <h3>List of todo</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Todo</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todoList.map((item: ToDo) => {
                            return (
                                <tr key={item.id}>
                                    <td><input type="checkbox" value={item.id} checked={item.completed}
                                               disabled={view === "CreateEdit"}
                                               onChange={() => this.handleTodoListChange(item.id, "completed")}/></td>
                                    <td>{item.todo}</td>
                                    {
                                        view === "CreateEdit" ? (
                                            <td><Link to={`/create-edit/edit/${item.id}`}>edit</Link> | <button
                                                onClick={() => this.handleTodoListChange(item.id, "toTrash")}>To
                                                Trash</button></td>
                                        ) : view === "TodoTrash" ? (
                                            (<td>
                                                <button
                                                    onClick={() => this.handleTodoListChange(item.id, "delete")}>Delete
                                                </button>
                                            </td>)
                                        ) : (<td>Other Actions</td>)
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        ) : (<div>{view === "TodoTrash" ? "Trash can is empty" : "You haven't added a todo yet."}</div>);
    }

}

export default ListTodo
