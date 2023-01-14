import TodoList from "./components/ToDoList"

export default function Home() {
    return (
      <>
        <main className="flex container bg-pagebg h-screen">
          <TodoList />
        </main>
      </>
    )
  }