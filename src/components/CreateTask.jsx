import React, { useState } from "react";
import toast from "react-hot-toast";

//uuid for input
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", // can be anything as the progress status
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    //toaster error
    if (task.name.length < 3) {
      return toast.error("Please fill more than 3 characters");
    } else if (task.name.length > 100) {
      return toast.error("Please fill only 100 characters");
    }
    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    //toast success
    toast.success("task added");
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between gap-4 mx-auto"
    >
      <input
        type="text"
        className="border rounded-lg p-2 bg-[#ffffff] text-[#000000] w-64"
        placeholder="what for today?"
        value={task?.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="bg-blue-700 text-[#ffffff] rounded-lg p-2 hover:bg-blue-500">
        create task
      </button>
    </form>
  );
};
export default CreateTask;
