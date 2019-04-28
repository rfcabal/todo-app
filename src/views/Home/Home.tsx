import React from 'react';
import './Home.css';
import ListTodo from "../../components/ListTodo/ListTodo";

class Home extends React.Component<any, { todoList: ToDo[] }> {

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
        this.setState({
            todoList
        })
    }

    handleTodoListChange(id: number, action: string) {
        console.log(id, action)
    }

    render() {
        return (
            <ListTodo todoList={this.state.todoList} view={"Home"} onChangeTodoList={this.handleTodoListChange}/>
        );
    }

}

export default Home;
