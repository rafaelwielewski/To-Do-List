import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAutosizeTextArea from "./useAutosizeTextArea";
import { Dropdown } from "flowbite-react";
import { Button } from "flowbite-react/lib/esm/components";
import { HiTrash, HiArrowsExpand,} from 'react-icons/hi';
import { FiMove } from 'react-icons/fi';

export default function CreateToDo({
  todo,
  updateTodo,
  removeTodo,
  completeTodo,
}) {
  const [value, setValue] = useState(todo.task);

  const dropdownButton = useState("button" + todo.id);

  const [completed, setCompleted] = useState(todo.completed);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
    updateTodo(val, todo.id);
  };

  const handleCompleted = (evt: React.MouseEventHandler<HTMLInputElement>) => {
    let completed;
    if (todo.completed === true) {
      completed = false;
    } else {
      completed = true;
    }
    setCompleted(completed);
    completeTodo(todo.id, completed);
  };

  const handleDelete = (evt) => {
    removeTodo(todo.id);
  };

  return (
    <div className="w-full text-white flex justify-start items-center px-3">
      
      <div className="hover:text-white rounded focus:text:white text-secondary">
      <Dropdown inline={true} className="bg-secondary text-white -mt-2 -mx-5 border-none focus:ring-5 focus:border-5 focus:ring-offset-0 " label="">
      
        <div className="bg-secondary -my-2">
          <Dropdown.Item 
          icon={FiMove}
          className="hover:bg-tertiary"
          >Move</Dropdown.Item>
          <Dropdown.Item 
          
          onClick={handleDelete}
          icon={HiTrash}
          className="hover:bg-tertiary"
          >Delete</Dropdown.Item>
        </div>
      </Dropdown>
      </div>
  
      <input
        type="checkbox"
        className="form-checkbox ml-5 w-6 h-6 bg-primary rounded-full flex justify-center items-center 
        border border-gray 
        transition-all cursor-pointer 
        hover:border-white
        focus:ring-0
        focus:ring-offset-0
        "
        onClick={handleCompleted}
        defaultChecked={todo.completed}
      ></input>
      <textarea
        onChange={handleChange}
        id={value}
        ref={textAreaRef}
        rows={1}
        value={value}
        className={
          todo.completed
            ? "bg-primary text-base line-through ml-2 w-full border-none flex align-middle focus:outline-none focus:ring-0 resize-none"
            : "bg-primary text-base ml-2 w-full border-none flex align-middle focus:outline-none focus:ring-0 resize-none"
        }
        placeholder="To-do"
      />
    </div>
  );
}
