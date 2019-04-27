import React from 'react';
import './CreateEdit.css';
import './FormTodo/FormTodo'
import FormTodo from "./FormTodo/FormTodo";

interface ToDo {
    id: number,
    todo: string
}

interface CreateEditState {
    currentAction: string;
    currentId: number
}

const todo: ToDo[] = [
    {id: 1, todo: "fix routes"},
    {id: 2, todo: "do localstorage"}
]

class CreateEdit extends React.PureComponent<{ location: any }, CreateEditState> {

    constructor(props: any) {
        super(props)
        this.state = {
            currentAction: 'list',
            currentId: 0
        }
    }

    componentDidMount() {
        const {location: {search}} = this.props,
            params = new URLSearchParams(search),
            action = params.get('action'),
            id = params.get('id');

        this.updateCurrentAction({
            currentAction: action ? action : 'list',
            currentId: id ? parseInt(id) : 0
        })
    }

    updateCurrentAction(params: CreateEditState) {
        this.setState({
            currentAction: params.currentAction,
            currentId: params.currentId ? params.currentId : 0
        })
    }

    findTodo(id: number) {

        let todoHash: any[] = [];

        if (id === 0) {
            return undefined
        }

        todo.map((item: ToDo) => {
            todoHash[item.id] = item.todo
            return null
        })

        return todoHash[id];
    }

    render() {
        const {currentId, currentAction} = this.state
        return (
            <div>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <a href="?action=create">Create</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                {currentAction !== 'list' ? (
                    <FormTodo action={currentAction} id={currentId} data={this.findTodo(currentId)}/>
                ) : (
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
                                            <td><a href={`?action=edit&id=${item.id}`}>edit</a> | delete</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                )

                }
            </div>
        );
    }

}

export default CreateEdit
