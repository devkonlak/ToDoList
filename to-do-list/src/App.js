import React, { useEffect } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import Additem from "./Additem";
function App() {
  const API_URL = "http://localhost:3500/items"; // {/** */}
  const [items, setItems] = useState([]);
  //{
  /* while receving the data from API we dont need to fetch the  data from localStorage.
  /** localStorage.getItem('todo')Retrieves the value associated with the key 'todo' from local storage.
   * JSON.parse(...): Parses the retrieved value from local storage, converting it from a string to its JavaScript object representation.
   * || [] If the previous step (JSON.parse(...)) fails (because localStorage.getItem('todo') returned null or undefined), the entire expression evaluates to an empty array []. This ensures that the code always has an array to work with, even if no to-do items were previously stored.
   */
  // }
  const [fetchError, setFetchError] = useState(null); // handling error using usestate
  useEffect(() => {
    //An asynchronous function to fetch items from an API.
    const fetchItems = async () => {
      try {
        //// Sending a GET request to the API URL
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received");

        const listTask = await response.json();

        setItems(listTask);
        setFetchError(null); // incase of no error setting fetch error to null
      } catch (err) {
        setFetchError(err.message); // in case of error display  error message
      }
    };
    (async () => await fetchItems())();
    //  {/*
    //  *(async () => await fetchItems()): is an anonymous arrow function defined using the async function expression. Inside this function, fetchItems() is awaited, making sure that the asynchronous operation completes before proceeding.
    //  * ():  function expression is immediately invoked because it's followed by (). This means the function is executed immediately after its definition.
    //  */}
  }, []);

  //{/** useEffect hook is being used to fetch items from an API when the component mounts, as indicated by the empty dependency array.*/}

  const addTask = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; //Calculating the ID for a new item based on the length of the 'items' array.
    const addNewTask = { id, checked: false, item }; // creating addNewTask object
    const newListItems = [...items, addNewTask]; // addNewTask is added to the rest of the items
    setItems(newListItems);
  };

  const [newTask, setNewTask] = useState(" ");
  const handleCheck = (id) => {
    const listItem = items.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    //{
    /* *Using the map function to iterate over the items array then checking if the id of the current task matches the provided id. If the id matches, creating a new task object with the checked property toggled to the opposite of its current value using !task.checked.If the id does not match, keeping the task object unchanged.*/
    // }
    setItems(listItem);
  };

  const handleDelete = (id) => {
    const delTask = items.filter((task) => task.id !== id);
    setItems(delTask);
    //{
    /**Filtering the items array to exclude the task with the provided ID */
    //}
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!newTask) return; // checks if the newTask state variable is empty. If it's empty, the function returns early, indicating that no action should be taken.

    //addTask
    addTask(newTask);
    setNewTask("");
    // Clearing the 'newTask' state variable by setting it to an empty string
  };

  return (
    <div className="App">
      <Header />
      <Additem
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />
      <main>
        {fetchError && <p>{`Error:${fetchError}`}</p>}  {/**in case of error the error message ll be rendered. if there is no error nothing ll render */}
        <Content
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      </main>
      {/** Sending the props to Content component */}
      <Footer length={items.length} />
    </div>
  );
}

export default App;
