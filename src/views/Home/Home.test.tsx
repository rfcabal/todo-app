import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

configure({adapter: new Adapter()});

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: false},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
];

localStorage.setItem("todo", JSON.stringify(todo));

describe("Home Component", () => {

    test("renders without crashing", () => {
        const wrapper = shallow(<Home/>)
        expect(wrapper.exists()).toBe(true);
    })

    test("change todo list", () => {
        const wrapper = shallow(<Home/>)
        expect(wrapper.state("todoList")).toEqual(todo)
    })

})




