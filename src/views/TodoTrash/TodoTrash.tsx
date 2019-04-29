import React from 'react';
import './TodoTrash.css';
import ListTodo from "../../components/ListTodo/ListTodo";

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
        const {todoList} = this.state,
            todoIndex = todoList.findIndex((item: ToDo) => item.id === id);

        if (action === "delete") {
            let confirmDelete: boolean = window.confirm("Are you sure?")

            if (confirmDelete && todoIndex !== -1) {
                todoList.splice(todoIndex, 1);
                localStorage.setItem('trash', JSON.stringify(todoList));
                this.updateTodoList(todoList)
                alert(`you have deleted todo id: ${id}`);
            }
        }

        if (action === "restore") {
            const stringCurrentTodos = localStorage.getItem("todo");
            let currentTodos = stringCurrentTodos ? JSON.parse(stringCurrentTodos) : [];
            currentTodos.push(todoList[todoIndex]);
            todoList.splice(todoIndex, 1);
            localStorage.setItem('trash', JSON.stringify(todoList));
            localStorage.setItem('todo', JSON.stringify(currentTodos));
            this.updateTodoList(todoList)
            alert(`you have restored todo id: ${id}`);
        }
    }

    render() {
        return (
            <ListTodo todoList={this.state.todoList} view={"TodoTrash"} onChangeTodoList={this.handleTodoListChange}/>
        );
    }

}

export default TodoTrash;
