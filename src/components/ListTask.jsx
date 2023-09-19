import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const ListTask = ({ tasks, setTasks }) => {
  const [todos, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    //filter for process
    const filterTodos = tasks.filter((task) => task.status === "todo");
    const filterInProgress = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const filterDone = tasks.filter((task) => task.status === "close");

    setTodo(filterTodos);
    setInProgress(filterInProgress);
    setDone(filterDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "close"];

  return (
    <div className="text=[#000000] flex flex-col md:flex-row lg:flex-row justify-between">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
};

export default ListTask;

const Section = ({ status, tasks, setTasks, todos, inProgress, done }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todos";
  let bg = "bg-slate-500";
  let taskToMap = todos;

  //condition proses of todo
  if (status === "inprogress") {
    text = " In Progress";
    bg = "bg-purple-500";
    taskToMap = inProgress;
  }

  if (status === "close") {
    text = "Task done";
    bg = "bg-green-500";
    taskToMap = done;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mapTask = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mapTask));
      toast;
      //   "task change", { icon: "iconnya" };
      toast.success("status has been change");
      return mapTask;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-[30%] rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={taskToMap.length} />
      {taskToMap.length > 0 &&
        taskToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm`}
    >
      {text}
      <div className="ml-2 bg-[#ffffff] w-5 h-5 rounded-full flex items-center text-[#000000] justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  //for drag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const filterTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filterTasks));
    setTasks(filterTasks);

    toast.success("task sucessfully removed");
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p className="text-[#000000]">{task.name}</p>
      <button
        className="absolute bottom-5 right-5 text-slate-400"
        onClick={() => handleRemove(task.id)}
      >
        <Icon icon="lucide:delete" width={20} />
      </button>
    </div>
  );
};
