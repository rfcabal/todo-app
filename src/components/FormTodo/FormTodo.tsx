import React from 'react';
import './FormTodo.css';
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from "react-router";
import {Button, Form} from 'react-bootstrap';
import utils from "../../utils/utils"
import MockService from "../../services/mockService";

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
        MockService(action, id, this.state)
        if (action === "create") this.props.history.push('/')
        event.preventDefault();
    }

    render() {

        const {action, id} = this.props

        return (
            <div>
                <h3>{action === "create" ? "Create Todo" : `Modify Todo - id: ${id}`}</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>
                                Todo
                            </Form.Label>
                            <Form.Control
                                required
                                id="todo"
                                type="text"
                                defaultValue={this.state.todo}
                                onChange={this.handleChange}
                                placeholder="Do my homework..."
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>
                                Due Date
                            </Form.Label>
                            <Form.Control
                                required
                                id="dueDate"
                                type="date"
                                defaultValue={this.state.dueDate}
                                onChange={this.handleChange}
                                placeholder="Do my homework..."
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">{action === "create" ? "Create" : "Save"}</Button>
                </Form>
            </div>
        );
    }

}

export default withRouter(FormTodo);
