import React from 'react';
import './FormTodo.css';
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from "react-router";

type PathParms = {
    history: any
}

type FormTodoProps = RouteComponentProps<PathParms> & {
    action: string,
    id: number,
    data: ToDo

}

class FormTodo extends React.Component<FormTodoProps, any> {

    currentTodos: ToDo[] = [];

    constructor(props: FormTodoProps) {
        super(props)
        const stringTodo = localStorage.getItem("todo")
        this.currentTodos = stringTodo ? JSON.parse(stringTodo) : []
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            id: this.dinamicId(FormTodo.getRandomInt(1000)),
            todo: "",
            dueDate: this.parseDate(new Date()),
            completed: false
        }
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

    parseDate(date: Date) {
        const day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear()

        return (`${year}-${month > 9 ? month : 0 + month.toString()}-${day}`);
    }

    handleChange(event: any) {
        const {target: {id, value}} = event
        this.setState({
            [id]: value
        })
    }

    handleSubmit(event: any) {
        const stringTodo = localStorage.getItem("todo")
        let currentTodos = stringTodo ? JSON.parse(stringTodo) : [];
        currentTodos = [...currentTodos, this.state]
        localStorage.setItem("todo", JSON.stringify(currentTodos));
        this.props.history.push('/')
        event.preventDefault();
    }

    render() {

        const {action, id, data} = this.props

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
