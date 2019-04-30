import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormTodo from './FormTodo';
import utils from "../../utils/utils";

configure({adapter: new Adapter()});

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: false},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
];

localStorage.setItem("todo", JSON.stringify(todo));

describe("FormTodo Component", () => {
    test("renders without crashing", () => {
        const wrapper = shallow(<FormTodo action={"edit"} id={2}/>)
        expect(wrapper.exists()).toBe(true);
    })
    test("todo date expect to be with a DefaultValue when action is Created", () => {
        const dateNow = utils.parseDate(new Date());
        // @ts-ignore
        const wrapper = shallow(<FormTodo.WrappedComponent action={"create"} id={0}/>)
        expect(wrapper.find("#dueDate").props().defaultValue).toEqual(dateNow);
    })
    test("todo text expect to be with a DefaultValue", () => {
        // @ts-ignore
        const wrapper = shallow(<FormTodo.WrappedComponent action={"edit"} id={2}/>)
        expect(wrapper.find("#todo").props().defaultValue).toEqual("do localstorage");
    })
    test("todo text is echoed", () => {
        // @ts-ignore
        const wrapper = shallow(<FormTodo.WrappedComponent action={"create"} id={0}/>)
        wrapper.find("#todo").simulate("change", {
            target: {id: "todo", value: "test"}
        })
        expect(wrapper.find("#todo").props().defaultValue).toEqual("test");

    })
    test("todo date is echoed", () => {
        // @ts-ignore
        const wrapper = shallow(<FormTodo.WrappedComponent action={"create"} id={0}/>)
        wrapper.find("#dueDate").simulate("change", {
            target: {id: "dueDate", value: "2018-01-20"}
        })
        expect(wrapper.find("#dueDate").props().defaultValue).toEqual("2018-01-20");

    })
    test("When the form is submitted the event is cancelled", () => {
        // @ts-ignore
        const wrapper = shallow(<FormTodo.WrappedComponent action={"create"} id={0} history={{push: jest.fn()}}/>)
        let prevented = false;
        wrapper.find("Form").simulate("submit", {
            preventDefault: () => {
                prevented = true
            }
        })
        expect(prevented).toBeTruthy()
    })
})
