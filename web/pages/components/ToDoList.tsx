import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useAutosizeTextArea from "./useAutosizeTextArea";
import { FiMove } from "react-icons/fi";
import ToDo from "./ToDo";
import CreateToDo from "./CreateTodo";
import { Todo } from "../../types/Todo";
import { List } from "../../types/List";
import { listenerCount, title } from "process";
import http from "../../services/http";

export default function TodoList() {
  const [errorTodo, setErrorTodo] = useState(null);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [todoList, setTodoList] = useState<List>({
    listId: 1, // colocar NaM
    userId: 1, // colocar NaM
    title: '',
  });

  useEffect(() => {
    getTodoList().then();
  }, []);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, todoList.title);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {

    setTodoList({ ...todoList, title: evt.target?.value })

  };

  

  const getTodoList = async () => {

    try {

      const response = await http.get(`/todo-list/${todoList.listId}`);

      setTodoList(response.data);

    } catch (e) {
      console.log(e);
    }

    try {

      const response = await http.get(`/todo/${todoList.listId}`);

      setTodos(response.data);

    } catch (e) {
      console.log(e);
    }
    
  };

  const createTodo = () => {

    const order = todos.length + 1;
    setTodos([
      ...todos,
      { id: uuidv4(), listId: 1, order: order, task: "", completed: false },
    ]);
  };

  const updateTodo = (updatedTask: string, id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const completeTodo = (id: string, completed: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = async (id: string) => {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));

    try {
      const response = await http.delete(`/todo/${id}`);

    } catch (e) {
      console.log(e);
    }
  };


  const saveList = async () => {

    console.log(todos)
    todos.forEach(async (todo) => {
      try {
        const response = await http.post("/todo", {
          id: todo.id,
          listId: 1,
          task: todo.task,
          order: todo.order,
          completed: todo.completed,
        });

      } catch (e) {
        console.log(e);
      }
    });
    console.log(todoList.listId)
    try {
      const response = await http.post("/todo-list", {
        listId: 1,
        userId: 1,
        title: todoList.title
      });

    } catch (e) {
      console.log(e);
    }

  };

  const todosList = todos.map((todo) => (
    <ToDo
      key={todo.id}
      todo={todo}
      updateTodo={updateTodo}
      removeTodo={removeTodo}
      completeTodo={completeTodo}
    />
  ));

  return (
    <>
      <main className="w-full">
        <input
          type="submit"
          onClick={saveList}
          className="absolute bg-green-500 hover:bg-green-400 px-4 py-2 rounded-full top-3 right-48 cursor-pointer text-xl text-white flex"
          value="Save"
        />
        <div className="pt-16 px-56 w-full">
          <textarea
            onChange={handleChange}
            id={todoList.title}
            ref={textAreaRef}
            rows={1}
            value={todoList.title}
            className="bg-primary text-3xl text-white font-bold ml-10 mb-2 w-full border-none flex align-middle focus:outline-none focus:ring-0 resize-none"
            placeholder="To-Do List Title"
          />
          <ul>{todosList}</ul>
          <div
            onClick={createTodo}
            className="cursor-pointer items-center text-gray hover:text-white ml-14 px-1 mt-2 flex"
          >
            <i className="fa-solid fa-plus"></i>
            <input
              type="submit"
              className="cursor-pointer text-base ml-2 px-1 items-center text-center"
              value="Add row"
            ></input>
          </div>
        </div>
      </main>
    </>
  );
}
