import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ToDo from "./ToDo"
import CreateToDo from "./CreateTodo";
export default function TodoList() {


  const [list, setList] = useState([
    { id: '1', task: 'task1', completed: true},
    { id: '2', task: 'task2', completed: true},
    { id: '3', task: 'task3', completed: true},
    { id: uuidv4(), task: '', completed: false},
  ]);
  
  const create = newTodo => {
    console.log(newTodo);
    setList([...list, newTodo]);
    console.log(list);
  };

  const update = (updatedTask, id) => {
    const updatedTodos = list.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    setList(updatedTodos);
  };

  const complete = (id, completed) => {
    const updatedTodos = list.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: completed };
      }
      return todo;
    });
    setList(updatedTodos);
  };

  const remove = (id) => {
    setList(list.filter(todo => todo.id !== id));
  };

  const handleAdd = evt => {
    evt.preventDefault();
    setList([...list, { id: uuidv4() , task: '', completed: false }])
  };
  
  const handleSave = evt => {
    console.log(list);
  };

  const todosList = list.map(todo => (
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
        <main className="pt-16 px-56 w-full">
          <input type="submit" 
          onClick={handleSave}
          className="cursor-pointer w-full text-xl text-white border-y border-dark flex justify-center items-center px-3"
          value="Save"
          />
          <ul>{todosList}</ul>
          <input 
          onClick={handleAdd}
          type="submit" 
          className="cursor-pointer w-full text-xl text-white border-y border-dark flex justify-center items-center px-3" 
          value="Add"></input>
        </main>
      </>
    )
  }