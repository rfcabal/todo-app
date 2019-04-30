import utils from "../utils/utils";

function MockService(action: string, id?: number, newTodo?: any) {

    const stringTodo = localStorage.getItem("todo"),
        stringTrash = localStorage.getItem("trash"),
        services = {
            create: () => {
                let currentTodos = stringTodo ? JSON.parse(stringTodo) : [];
                currentTodos = [...currentTodos, newTodo]
                localStorage.setItem("todo", JSON.stringify(currentTodos));
            },
            update: () => {
                let currentTodos = stringTodo ? JSON.parse(stringTodo) : [];
                const todoIndex = currentTodos.findIndex((todo: ToDo) => todo.id === id)
                currentTodos[todoIndex] = newTodo;
                localStorage.setItem("todo", JSON.stringify(currentTodos));
                alert(`todo id: ${id} has been updated.`)
            },
            completed: () => {
                const now = utils.parseDate(new Date());
                const stringTodoList = localStorage.getItem("todo")

                let todoListStorage: ToDo[] = stringTodoList ? JSON.parse(stringTodoList) : [];
                const todoIndex = todoListStorage.findIndex((item: ToDo) => item.id === id)

                todoListStorage[todoIndex].completed = !todoListStorage[todoIndex].completed;

                if (todoListStorage[todoIndex].completed) todoListStorage[todoIndex].completedDate = now

                localStorage.setItem("todo", JSON.stringify(todoListStorage));

                alert(`Your todo ${id} is ${todoListStorage[todoIndex].completed ? "Completed" : "Uncompleted"}`);

                return todoListStorage
            },
            toTrash: () => {
                let todoList = stringTodo ? JSON.parse(stringTodo) : [],
                    trashTodoList = stringTrash ? JSON.parse(stringTrash) : [],
                    confirmDelete: boolean = window.confirm("Are you sure?")

                const todoIndex = todoList.findIndex((item: ToDo) => item.id === id);

                if (confirmDelete && todoIndex !== -1) {
                    trashTodoList.push(todoList[todoIndex]);
                    todoList.splice(todoIndex, 1);

                    localStorage.setItem("todo", JSON.stringify(todoList));
                    localStorage.setItem('trash', JSON.stringify(trashTodoList));

                    alert(`you have sent to the trash todo id: ${id}`);

                    return todoList;
                }
            },
            restore: () => {
                let trashTodoList = stringTrash ? JSON.parse(stringTrash) : [],
                    currentTodos = stringTodo ? JSON.parse(stringTodo) : [];
                const todoIndex = trashTodoList.findIndex((item: ToDo) => item.id === id);

                currentTodos.push(trashTodoList[todoIndex]);
                trashTodoList.splice(todoIndex, 1);
                localStorage.setItem('trash', JSON.stringify(trashTodoList));
                localStorage.setItem('todo', JSON.stringify(currentTodos));

                alert(`you have restored todo id: ${id}`);

                return trashTodoList
            },
            delete: () => {
                let trashTodoList = stringTrash ? JSON.parse(stringTrash) : [];
                const todoIndex = trashTodoList.findIndex((item: ToDo) => item.id === id);
                let confirmDelete: boolean = window.confirm("Are you sure?")

                if (confirmDelete && todoIndex !== -1) {
                    trashTodoList.splice(todoIndex, 1);
                    localStorage.setItem('trash', JSON.stringify(trashTodoList));

                    alert(`you have deleted todo id: ${id}`);

                    return trashTodoList
                }
            }
        };

    if (action === "completed") {
        return services.completed()
    } else if (action === "create" && newTodo) {
        return services.create()
    } else if (action === "edit" && newTodo && id) {
        return services.update()
    } else if (action === "toTrash" && id) {
        return services.toTrash()
    } else if (action === "restore" && id) {
        return services.restore()
    } else if (action === "delete" && id) {
        return services.delete()
    } else {
        return []
    }
}


export default MockService
