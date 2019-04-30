import React from 'react';
import './CompletedList.css';
import ListTodo from "../../components/ListTodo/ListTodo";
import MockService from "../../services/mockService";

class CompletedList extends React.Component<any, { todoList: ToDo[] }> {

    constructor(props: any) {
        super(props)
        this.handleTodoListChange = this.handleTodoListChange.bind(this);
        this.state = {
            todoList: []
        }
    }

    componentDidMount() {
        const stringTodoList = localStorage.getItem("todo");
        const todoList = stringTodoList ? JSON.parse(stringTodoList) : [];
        this.updateTodoList(todoList);
    }

    updateTodoList(todoList: ToDo[]) {
        const filterCompleted = todoList.filter(todo => todo.completed);
        this.setState({
            todoList: filterCompleted
        })
    }

    handleTodoListChange(id: number, action: string) {
        const newState = MockService(action, id);
        this.updateTodoList(newState);
    }

    render() {
        return (
            <ListTodo todoList={this.state.todoList} view={"CompletedList"}
                      onChangeTodoList={this.handleTodoListChange}/>
        );
    }
}

export default CompletedList;
