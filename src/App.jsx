import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

//drop and down extention
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Navbar from "./components/Navbar";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      <Toaster />
      <section className=" bg-[#ffffff] w-full paddingX paddingY min-h-screen">
        <div className="flex flex-col justify-center gap-10 p-3 pt-32">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </section>
    </DndProvider>
  );
}

export default App;
