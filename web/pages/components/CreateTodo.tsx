import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useAutosizeTextArea from "./useAutosizeTextArea";


export default function CreateToDo({ todo, createTodo }) {

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newTodo = { id: uuidv4(), task: value};
    createTodo(newTodo);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-white border-y border-dark flex justify-start items-center px-3">
      <input
        type="checkbox"
        className=" w-6 h-6 bg-pagebg rounded-full flex justify-center items-center 
        border border-gray 
        transition-all cursor-pointer 
        hover:border-white
        "
      ></input>
      <textarea
        onChange={handleChange}
        id={value}
        ref={textAreaRef}
        rows={1}
        value={value}
        className="bg-pagebg ml-2 w-full border-none flex align-middle focus:outline-none focus:ring-0 resize-none"
        placeholder="To-do"
      />
      <input type="submit" value="Save"
        className="bg-pagebg cursor-pointer rounded-full flex justify-center items-center">
      </input>
    </form>
  );
}
