import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("completedTasks")) || []
  );
  const [inProgressTasks, setInProgressTasks] = useState(
    JSON.parse(localStorage.getItem("inProgressTasks")) || []
  );
  const [task, setTask] = useState("");

  useEffect(() => {
    // Save tasks, completedTasks, and inProgressTasks to localStorage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasks));
  }, [tasks, completedTasks, inProgressTasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task.trim()]);
      setTask("");
    }
  };

  const completeTask = (index) => {
    const completedTask = tasks[index];
    setCompletedTasks([...completedTasks, completedTask]);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const moveToInProgress = (index) => {
    const inProgressTask = tasks[index];
    setInProgressTasks([...inProgressTasks, inProgressTask]);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const deleteTask = (index, section) => {
    if (section === "tasks") {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } else if (section === "inProgressTasks") {
      const updatedInProgressTasks = inProgressTasks.filter(
        (_, i) => i !== index
      );
      setInProgressTasks(updatedInProgressTasks);
    } else if (section === "completedTasks") {
      const updatedCompletedTasks = completedTasks.filter(
        (_, i) => i !== index
      );
      setCompletedTasks(updatedCompletedTasks);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navigation />
      <div>
        <h1 className="text-4xl m-5 p-5 font-bold">MY TO DO LIST</h1>
      </div>
      <div className="p-6">
        <input
          className="bg-slate-100 rounded-md p-4 m-4"
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          onKeyDown={handleKeyPress}
          placeholder="Create a new todo"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white p-3 m-3  rounded-md font-bold hover:bg-green-600"
        >
          Add Task
        </button>
      </div>
      <div>
        <div>
          <h2 className="text-xl font-bold">Tasks To Do</h2>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task, index) => (
                <div
                  className="flex bg-slate-300 m-4 py-1 pl-10 pr-1 rounded-md justify-between items-center"
                  key={index}
                >
                  <li className="self-center font-semibold pr-10 mr-20 grow">
                    {task}
                  </li>
                  <button
                    onClick={() => moveToInProgress(index)}
                    className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center  m-2"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => completeTask(index)}
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center  m-2"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => deleteTask(index, "tasks")}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center m-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <p className="mb-5">No active tasks found</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">In Progress Tasks</h2>
          {inProgressTasks.length > 0 ? (
            <ul>
              {inProgressTasks.map((task, index) => (
                <div
                  className="flex bg-yellow-100 m-4 py-1 pl-10 pr-1 rounded-md justify-between items-center"
                  key={index}
                >
                  <li className="self-center font-semibold pr-10 mr-20 grow">
                    {task}
                  </li>
                  <div className="flex items-center">
                    <button
                      onClick={() => completeTask(index)}
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center m-2"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => deleteTask(index, "inProgressTasks")}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center m-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="mb-5">No tasks in progress</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">Completed Tasks</h2>
          {completedTasks.length > 0 ? (
            <ul>
              {completedTasks.map((task, index) => (
                <div
                  className="flex bg-green-100 m-4 py-1 pl-10 pr-1 rounded-md justify-between items-center"
                  key={index}
                >
                  <li className="self-center font-semibold pr-10 mr-20 grow">
                    {task}
                  </li>
                  <button
                    onClick={() => deleteTask(index, "completedTasks")}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center m-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <p className="">No completed tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
