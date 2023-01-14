import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useAutosizeTextArea from "./useAutosizeTextArea";


export default function CreateToDo({ todo, createTodo, updateTodo, removeTodo,completeTodo }) {

  const [value, setValue] = useState(
    todo.task
  );

  const [completed, setCompleted] = useState(
    todo.completed
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
    updateTodo(val, todo.id)
  };

  const handleCompleted = (evt: React.MouseEventHandler<HTMLInputElement>) => {

    let completed 
      if (todo.completed === true ) {
        completed = false
      } else {
        completed = true
      }
      setCompleted(completed)
    completeTodo(todo.id, completed);
  };

  const handleDelete = evt => {
    evt.preventDefault();
    removeTodo(todo.id);
  };


  return (
    <div
      className="w-full text-white border-y border-dark flex justify-start items-center px-3">
      <input 
        type="checkbox"
        className="w-6 h-6 bg-pagebg rounded-full flex justify-center items-center 
        border border-gray 
        transition-all cursor-pointer 
        hover:border-white
        "
        onClick={handleCompleted}
        checked={todo.completed}
      ></input>
      <textarea
        onChange={handleChange}
        id={value}
        ref={textAreaRef}
        rows={1}
        value={value}
        className={todo.completed 
          ? "bg-pagebg line-through ml-2 w-full border-none flex align-middle focus:outline-none focus:ring-0 resize-none" 
          : "bg-pagebg ml-2 w-full border-none flex align-middle focus:outline-none focus:ring-0 resize-none"}
        placeholder="To-do"
      />
      <input type="submit" value="Delete"
        onClick={handleDelete}
        className="bg-pagebg cursor-pointer rounded-full flex justify-center items-center">
      </input>
    </div>
  );
}
