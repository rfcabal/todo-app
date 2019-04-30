import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListTodo from './ListTodo';

configure({adapter: new Adapter()});

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: false},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
];

describe("ListTodo Component", () => {
    test("renders without crashing", () => {
        const wrapper = shallow(<ListTodo view={"home"} todoList={todo} onChangeTodoList={() => console.log("works")}/>)
        expect(wrapper.exists()).toBe(true);
    })
})
