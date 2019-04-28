import React from 'react';
import './FormTodo.css';
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from "react-router";
import utils from "../../utils/utils"

type PathParms = {
    history: any
}

type FormTodoProps = RouteComponentProps<PathParms> & {
    action: string,
    id: number,

}

class FormTodo extends React.Component<FormTodoProps, any> {

    currentTodos: ToDo[] = [];

    constructor(props: FormTodoProps) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            id: this.dinamicId(FormTodo.getRandomInt(1000)),
            todo: "",
            dueDate: utils.parseDate(new Date()),
            completed: false
        }
    }

    componentDidMount() {
        const {action, id} = this.props
        const stringTodo = localStorage.getItem("todo")
        this.currentTodos = stringTodo ? JSON.parse(stringTodo) : []
        if (action === "edit") {
            const currentTodo = this.currentTodos.find(todo => todo.id === id);
            if (currentTodo) this.updateTodo(currentTodo);
        }
    }

    updateTodo(todo: ToDo) {
        this.setState(todo);
    }

    static getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    dinamicId(oldId: number) {
        const indexId = this.currentTodos.findIndex((item: ToDo) => item.id === oldId);
        while (indexId !== -1) {
            this.dinamicId(FormTodo.getRandomInt(1000));
        }
        return oldId
    }

    handleChange(event: any) {
        const {target: {id, value}} = event
        this.setState({
            [id]: value
        })
    }

    handleSubmit(event: any) {
        const {action, id} = this.props
        const stringTodo = localStorage.getItem("todo")
        let currentTodos = stringTodo ? JSON.parse(stringTodo) : [];
        if (action === "create") {
            currentTodos = [...currentTodos, this.state]
            localStorage.setItem("todo", JSON.stringify(currentTodos));
            this.props.history.push('/')
        } else {
            console.log("you are updating")
            const todoIndex = currentTodos.findIndex((todo: ToDo) => todo.id === id)
            currentTodos[todoIndex] = this.state;
            localStorage.setItem("todo", JSON.stringify(currentTodos));
            alert(`todo id: ${id} has been updated.`)
        }
        event.preventDefault();
    }

    render() {

        const {action, id} = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h3>{action} {id > 0 ? ` - id: ${id}` : null}</h3>
                    <label>Todo</label>
                    <input id="todo" type="text" value={this.state.todo} onChange={this.handleChange}/>
                    <label>Due Date</label>
                    <input id="dueDate" type="date" value={this.state.dueDate} onChange={this.handleChange}/>
                    <button type="submit">{action === "create" ? "Create" : "Save"}</button>
                </div>
            </form>
        );
    }

}

export default withRouter(FormTodo);
