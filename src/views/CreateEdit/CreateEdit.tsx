import React from 'react';
import './CreateEdit.css';
import '../../components/FormTodo/FormTodo'
import FormTodo from "../../components/FormTodo/FormTodo";
import {withRouter} from "react-router-dom";
import {Button} from 'react-bootstrap';
import {RouteComponentProps} from "react-router";
import MockService from './../../services/mockService'
import ListTodo from "../../components/ListTodo/ListTodo";

type PathParms = {
    history: any
}

type CreateEditProps = RouteComponentProps<PathParms> & {
    match: any
}

interface CreateEditState {
    currentAction: string,
    currentId: number,
    todoList: ToDo[]
}

class CreateEdit extends React.Component<CreateEditProps, CreateEditState> {

    constructor(props: any) {
        super(props)
        this.handleTodoListChange = this.handleTodoListChange.bind(this)
        this.state = {
            currentAction: 'list',
            currentId: 0,
            todoList: []
        }
    }

    componentDidMount() {
        const {match: {params: {action, id}}} = this.props;
        const stringTodo = localStorage.getItem("todo")
        this.updateTodoList(stringTodo ? JSON.parse(stringTodo) : [])
        if (action || id) {
            this.updateStates(action, id)
        }
    }

    componentDidUpdate(prevProps: any, prevState: CreateEditState) {
        const {match: {params: {action, id}}} = this.props
        if (prevProps.match.params.action !== action || prevProps.match.params.id !== id) {
            this.updateStates(action, id)
        }
    }

    updateStates(action: any, id: any) {
        this.setState({
            currentAction: action ? action : 'list',
            currentId: id ? parseInt(id) : 0
        })
    }

    updateTodoList(todoList: ToDo[]) {
        this.setState({
            todoList
        })
    }

    goTo(path: string) {
        this.props.history.push(path)
    }

    handleTodoListChange(id: number, action: string) {
        const newState = MockService(id, action);
        this.updateTodoList(newState);
    }

    render() {
        const {currentId, currentAction, todoList} = this.state

        return (
            <div>
                {currentAction === 'list' ? (
                    <div>
                        <Button variant="success" onClick={() => this.goTo("/create-edit/create")}>Create</Button>
                        <hr/>
                        <ListTodo todoList={todoList} view={"CreateEdit"} onChangeTodoList={this.handleTodoListChange}/>
                    </div>
                ) : (
                    <FormTodo action={currentAction} id={currentId}/>
                )

                }
            </div>
        );
    }

}

export default withRouter(CreateEdit)
