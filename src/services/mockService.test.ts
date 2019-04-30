import MockService from './mockService'

const newTodo: ToDo = {id: 25, todo: "do localstorage", dueDate: "2019-05-25", completed: false}

const todo: ToDo[] = [
    {id: 1, todo: "fix routes", dueDate: "2019-04-27", completed: false},
    {id: 2, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
];

const trash: ToDo[] = [
    {id: 30, todo: "do localstorage", dueDate: "2019-05-25", completed: false}
]

localStorage.setItem("todo", JSON.stringify(todo));
localStorage.setItem("trash", JSON.stringify(trash));

describe("Mock Service", () => {
    test('Created a todo', () => {
        MockService("create", undefined, newTodo);
        const todoString = localStorage.getItem("todo");
        const todoList: ToDo[] = todoString ? JSON.parse(todoString) : []

        expect(todoList).toHaveLength(3);
    });
    test('Complete a todo', () => {
        window.alert = () => {
        };
        MockService("completed", todo[1].id);
        const todoString = localStorage.getItem("todo");
        const todoList: ToDo[] = todoString ? JSON.parse(todoString) : [];

        expect(todoList[1].completed).toBeTruthy();
    });
    test('Update a todo', () => {
        window.alert = () => {
        };
        todo[1].todo = "Updated Todo";
        MockService("edit", todo[1].id, todo[1]);
        const todoString = localStorage.getItem("todo");
        const todoList: ToDo[] = todoString ? JSON.parse(todoString) : [];

        expect(todoList[1].todo).toBe(todo[1].todo);
    });
    test('Send a todo to Trash', () => {
        window.confirm = jest.fn(() => true)
        window.alert = () => {
        };
        MockService("toTrash", todo[1].id);
        const todoString = localStorage.getItem("trash");
        const todoList: ToDo[] = todoString ? JSON.parse(todoString) : []

        expect(todoList).toHaveLength(2);
    });
    test('Restore a todo', () => {
        window.alert = () => {
        };
        MockService("restore", todo[1].id);
        const todoString = localStorage.getItem("todo");
        const todoList: ToDo[] = todoString ? JSON.parse(todoString) : []

        expect(todoList).toHaveLength(3);
    });
    test('Send a todo to Trash', () => {
        window.confirm = jest.fn(() => true)
        window.alert = () => {
        };
        MockService("toTrash", todo[1].id);
        MockService("delete", todo[1].id);
        const todoString = localStorage.getItem("trash");
        const todoList: ToDo[] = todoString ? JSON.parse(todoString) : []

        expect(todoList).toHaveLength(1);
    });
    test('Use another actions', () => {
        const result = MockService("test", todo[1].id);
        expect(result).toHaveLength(0);
    });
})
