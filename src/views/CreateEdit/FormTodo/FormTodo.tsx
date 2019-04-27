import React from 'react';
import './FormTodo.css';

interface ToDo {
    id: number,
    todo: string,
    dueDate: Date,
    completed: Boolean,
    completedDate?: Date
}
interface FormTodoProps {
    action: string,
    id: number
    data: ToDo
}

class FormTodo extends React.PureComponent<FormTodoProps, {}> {


    render() {

        const {action, id, data} = this.props

        return (
            <div>
                <h3>{action} {id > 0 ? ` - id: ${id}` : null}</h3>
                <label>Todo</label>
                <input id="todo" type="text" value={data ? data.todo : undefined}/>
                <label>Due Date</label>
                <input id="todo" type="date"/>
            </div>
        );
    }

}

export default FormTodo;
