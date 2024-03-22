import React from "react";
import { FaPlus } from "react-icons/fa6";

const Additem = ({ newTask, setNewTask, handleSubmit }) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addTask">Add Task</label>
      <input
        type="text"
        id="addTask"
        placeholder="Add Task"
        required
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      {/**value={newTask} This ensures that the input field is controlled by React, meaning its value is determined by the state variable newTask.
       * When the value of the input field changes, the onChange event handler is triggered.
       * The onChange event handler calls the arrow function (e) => setNewTask(e.target.value).
       * Inside this arrow function, e.target.value represents the new value entered into the input field.
       * The setNewTask function is then called with this new value, updating the state variable newTask accordingly.
       */}
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
};

export default Additem;
