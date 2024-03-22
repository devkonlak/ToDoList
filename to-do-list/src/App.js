import React from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "Wake up by 5",
    },
    {
      id: 2,
      checked: false,
      item: "Practice Coding",
    },
    {
      id: 3,
      checked: false,
      item: "Sleep by 10",
    },
  ]);
  {
    /*defining default items inside useState as array of objects*/
  }

  const handleCheck = (id) => {
    const listItem = items.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    {
      /* *Using the map function to iterate over the items array then checking if the id of the current task matches the provided id. If the id matches, creating a new task object with the checked property toggled to the opposite of its current value using !task.checked.If the id does not match, keeping the task object unchanged.*/
    }
    setItems(listItem);
    localStorage.setItem("todo", JSON.stringify(listItem));
  };

  const handleDelete = (id) => {
    const delTask = items.filter((task) => task.id !== id);
    setItems(delTask);
    {
      /**Filtering the items array to exclude the task with the provided ID */
    }
    localStorage.setItem("todo", JSON.stringify(delTask));
  };
  return (
    <div className="App">
      <Header />
      <Content 
       items = {items}
       handleCheck = {handleCheck}
       handleDelete = {handleDelete}
       />
       {/** Sending the props to Content component */}
      <Footer 
      length = {items.length}
      />
    </div>
  );
}

export default App;
