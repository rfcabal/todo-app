import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateEdit from './CreateEdit';
import ListTodo from '../../components/ListTodo/ListTodo'
import FormTodo from '../../components/FormTodo/FormTodo'

configure({adapter: new Adapter()});

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: false},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
];

localStorage.setItem("todo", JSON.stringify(todo));

describe("CreateEdit Component", () => {

    test("renders without crashing", () => {
        const wrapper = shallow(<CreateEdit/>)
        expect(wrapper.exists()).toBe(true);
    })

    test("Update State todoList", () => {
        // @ts-ignore
        const wrapper = shallow(<CreateEdit.WrappedComponent match={{params: {action: "list", id: 0}}}/>)
        expect(wrapper.state("todoList")).toEqual(todo)
    })

    test("On List Action have the List", () => {
        // @ts-ignore
        const wrapper = shallow(<CreateEdit.WrappedComponent match={{params: {action: "list", id: 0}}}/>)
        expect(wrapper.find(ListTodo).length).toEqual(1);
    })

    test("On Create Action have the Form", () => {
        // @ts-ignore
        const wrapper = shallow(<CreateEdit.WrappedComponent match={{params: {action: "create", id: 0}}}/>)
        expect(wrapper.children(FormTodo).length).toEqual(1);
    })

    test("On Edit Action have the Form", () => {
        // @ts-ignore
        const wrapper = shallow(<CreateEdit.WrappedComponent match={{params: {action: "edit", id: 0}}}/>)
        expect(wrapper.children(FormTodo).length).toEqual(1);
    })

})
