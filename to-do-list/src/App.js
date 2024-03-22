import React from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import Additem from "./Additem";
function App() {
  const [items, setItems] = useState();
  {
    /*defining default items inside useState as array of objects*/
  }
  const addTask = (item) => {
    const id = items.length ? items[items.length -1] .id+1 : 1; //Calculating the ID for a new item based on the length of the 'items' array.
    const addNewTask = {id,checked:false,item} // creating addNewTask object
    const newListItems = [...items, addNewTask] // addNewTask is added to the rest of the items 
    setItems(newListItems);
    localStorage.setItem("todo", JSON.stringify(newListItems));
  }
  
  const [newTask,setNewTask] = useState(' ')
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
  const handleSubmit = (e) => {
   e.preventDefault() // Prevent the default form submission behavior
   if(!newTask) return;// checks if the newTask state variable is empty. If it's empty, the function returns early, indicating that no action should be taken.
   console.log(newTask)
   //addTask
   addTask(newTask)
   setNewTask('')
   // Clearing the 'newTask' state variable by setting it to an empty string
  }

  return (
    <div className="App">
      <Header />
      <Additem
      newTask = {newTask}
      setNewTask = {setNewTask}
      handleSubmit = {handleSubmit}

      />
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
