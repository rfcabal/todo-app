import React from 'react';
import './CreateEdit.css';
import './FormTodo/FormTodo'
import FormTodo from "./FormTodo/FormTodo";
import {Link} from "react-router-dom";
import ListTodo from "./ListTodo/ListTodo";

interface ToDo {
    id: number,
    todo: string,
    dueDate: Date,
    completed: Boolean,
    completedDate?: Date
}

interface CreateEditState {
    currentAction: string;
    currentId: number
}

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: new Date(2019, 3, 30), completed: false},
    {id: 2, todo: "do localstorage", dueDate: new Date(2019, 3, 30), completed: false}
]

class CreateEdit extends React.PureComponent<{ match: any }, CreateEditState> {

    constructor(props: any) {
        super(props)
        this.state = {
            currentAction: 'list',
            currentId: 0
        }
    }

    componentDidMount() {
        const {match: {params: {action, id}}} = this.props;
        if (action || id) {
            this.updateStates(action, id)
        }
    }

    componentDidUpdate(prevProps: any) {
        const {match: {params: {action, id}}} = this.props
        if (prevProps.match.params.action !== action || prevProps.match.params.id !== id) {
            this.updateStates(action, id)
        }
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

    updateStates(action: any, id: any) {
        this.setState({
            currentAction: action ? action : 'list',
            currentId: id ? id : 0
        })
    }

    render() {
        const {currentId, currentAction} = this.state

        return (
            <div>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/create-edit/create">Create</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {currentAction !== 'list' ? (
                    <FormTodo action={currentAction} id={currentId} data={this.findTodo(currentId)}/>
                ) : (
                    <ListTodo todoList={todo}/>
                )

                }
            </div>
        );
    }

}

export default CreateEdit
