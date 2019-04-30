import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CompletedList from './CompletedList';

configure({adapter: new Adapter()});

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: true},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: true}
];

const todoFalse: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: true},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
];

localStorage.setItem("todo", JSON.stringify(todo));

describe("Home Component", () => {

    test("renders without crashing", () => {
        const wrapper = shallow(<CompletedList/>)
        expect(wrapper.exists()).toBe(true);
    })

    test("change State todoList", () => {
        const wrapper = shallow(<CompletedList/>)
        expect(wrapper.state("todoList")).toEqual(todo)
    })

    test("have uncompleted todos minimize the quantity", () => {
        localStorage.setItem("todo", JSON.stringify(todoFalse));
        const wrapper = shallow(<CompletedList/>)
        expect(wrapper.state("todoList")).toHaveLength(1)
    })

})
