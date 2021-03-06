import React from 'react';
import './TodoTrash.css';
import ListTodo from "../../components/ListTodo/ListTodo";
import MockService from "../../services/mockService";

class TodoTrash extends React.Component<any, { todoList: ToDo[] }> {

    constructor(props: any) {
        super(props)
        this.handleTodoListChange = this.handleTodoListChange.bind(this);
        this.state = {
            todoList: []
        }
    }

    componentDidMount() {
        const stringTodoList = localStorage.getItem("trash");
        const todoList = stringTodoList ? JSON.parse(stringTodoList) : [];
        this.updateTodoList(todoList);
    }

    updateTodoList(todoList: ToDo[]) {
        this.setState({
            todoList
        })
    }

    handleTodoListChange(id: number, action: string) {
        const newState = MockService(action, id);
        this.updateTodoList(newState);
    }

    render() {
        return (
            <ListTodo todoList={this.state.todoList} view={"TodoTrash"} onChangeTodoList={this.handleTodoListChange}/>
        );
    }

}

export default TodoTrash;
