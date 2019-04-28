import React from 'react';
import './CompletedList.css';
import ListTodo from "../../components/ListTodo/ListTodo";

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
        if (action === "completed") {
            const {todoList} = this.state,
                todoIndex = todoList.findIndex((item: ToDo) => item.id === id),
                stringTodoList = localStorage.getItem("todo")
            let todoListStorage: ToDo[] = stringTodoList ? JSON.parse(stringTodoList) : [];
            todoListStorage[todoIndex].completed = !todoListStorage[todoIndex].completed;

            localStorage.setItem("todo", JSON.stringify(todoListStorage));
            console.log(todoListStorage)
            this.updateTodoList(todoListStorage)

            alert(`Your todo ${id} is ${todoList[todoIndex].completed ? "Completed" : "Uncompleted"}`);
        }
    }

    render() {
        return (
            <ListTodo todoList={this.state.todoList} view={"CompletedList"}
                      onChangeTodoList={this.handleTodoListChange}/>
        );
    }
}

export default CompletedList;
