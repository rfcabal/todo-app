import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ListTodo from './ListTodo';

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: false},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
];

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <ListTodo view={"Home"} todoList={todo} onChangeTodoList={() => console.log("works!")}/>
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
