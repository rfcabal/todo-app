import React from 'react';
import './ListTodo.css';
import {Alert, Button, ButtonGroup, Table} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";

type PathParms = {
    history: any
}

type ListTodoProps = RouteComponentProps<PathParms> & {
    todoList: ToDo[]
    view: string,
    onChangeTodoList: Function
}

class ListTodo extends React.Component<ListTodoProps> {

    handleTodoListChange(id: number, action: string) {
        this.props.onChangeTodoList(id, action);
    }

    goTo(path: string) {
        this.props.history.push(path)
    }

    render() {
        const {todoList, view} = this.props

        return todoList && todoList.length > 0 ? (
            <div>
                <h3>Todo List</h3>
                <Table responsive hover size="sm">
                    <thead>
                    <tr>
                        <th>Mark as complete</th>
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
                                               onChange={() => this.handleTodoListChange(item.id, "completed")}/>
                                    </td>
                                    <td>{item.todo}</td>
                                    {
                                        view === "CreateEdit" ? (
                                            <td>
                                                <ButtonGroup>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => this.goTo(`/create-edit/edit/${item.id}`)}>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => this.handleTodoListChange(item.id, "toTrash")}>To
                                                        Trash
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        ) : view === "TodoTrash" ? (
                                            (<td>
                                                <ButtonGroup>
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        onClick={() => this.handleTodoListChange(item.id, "restore")}>Restore
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => this.handleTodoListChange(item.id, "delete")}>Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </td>)
                                        ) : (<td>Other Actions</td>)
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        ) : (
            <div>
                <h3>Todo List</h3>
                <Alert
                    variant="warning">{view === "TodoTrash" ? "Trash can is empty" : view === "CompletedList" ? "You haven't completed todos yet." : "You haven't added a todo yet."}</Alert>
            </div>
        );
    }

}

export default withRouter(ListTodo)
