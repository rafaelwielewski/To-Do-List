import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAutosizeTextArea from "./useAutosizeTextArea";
import { FiMove } from "react-icons/fi";
import ToDo from "./ToDo";
import CreateToDo from "./CreateTodo";
import axios from "axios";

export default function TodoList() {

  const [errorTodo, setErrorTodo] = useState(null);
  const [title, setTitle] = useState<String>();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, title);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setTitle(val);
  };

  const [todos, setTodos] = useState([
    { id: "1", task: "task1", completed: true },
    { id: "2", task: "task2", completed: true },
    { id: "3", task: "task3", completed: true },
    { id: uuidv4(), task: "", completed: false },
  ]);

  const [todoList, setTodoList] = useState({ title: "", todos: "" });

  const create = (newTodo) => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
    console.log(todos);
  };

  const update = (updatedTask, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const complete = (id, completed) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAdd = (evt) => {
    evt.preventDefault();
    setTodos([...todos, { id: uuidv4(), task: "", completed: false }]);
  };

  const handleSave = async (e) => {

    e.preventDefault();
    setTodoList([title, todos]);

    console.log(todoList);
    try {
      const response = await axios.post(
        "http://localhost:3000/todo",
        {
          data: [title, todos],
        }
      );
      console.log(response);
    } catch (error) {
      setErrorTodo(error);
    }
  };

  const todosList = todos.map((todo) => (
    <ToDo
      key={todo.id}
      todo={todo}
      createTodo={create}
      updateTodo={update}
      removeTodo={remove}
      completeTodo={complete}
    />
  ));

  return (
    <>
      <main className="w-full">
        <input
          type="submit"
          onClick={handleSave}
          className="absolute bg-green-500 hover:bg-green-400 px-4 py-2 rounded-full top-3 right-20 cursor-pointer text-xl text-white flex"
          value="Save"
        />
        <div className="pt-16 px-56 w-full">
          <textarea
            onChange={handleChange}
            id={title}
            ref={textAreaRef}
            rows={1}
            value={title}
            className="bg-primary text-2xl ml-10 mb-2 w-full border-none flex align-middle focus:outline-none focus:ring-0 resize-none"
            placeholder="To-Do List Title"
          />
          <ul>{todosList}</ul>
          <div
            onClick={handleAdd}
            className="cursor-pointer items-center text-gray hover:text-white ml-14 px-1 mt-2 flex"
          >
            <i className="fa-solid fa-plus"></i>
            <input
              type="submit"
              className="cursor-pointer ml-2 px-1 items-center text-center"
              value="Add row"
            ></input>
          </div>
        </div>
      </main>
    </>
  );
}
