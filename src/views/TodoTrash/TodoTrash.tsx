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
        if (action === "delete") {
            const {todoList} = this.state,
                todoIndex = todoList.findIndex((item: ToDo) => item.id === id);
            let confirmDelete: boolean = window.confirm("Are you sure?")

            if (confirmDelete && todoIndex !== -1) {
                todoList.splice(todoIndex, 1);
                localStorage.setItem('trash', JSON.stringify(todoList));

                this.updateTodoList(todoList)

                alert(`you deleted the todo id: ${id}`);
            }
        }
    }

    render() {
        return (
            <ListTodo todoList={this.state.todoList} view={"TodoTrash"} onChangeTodoList={this.handleTodoListChange}/>
        );
    }

}

export default TodoTrash;
