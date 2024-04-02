import React, { useEffect } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import Additem from "./Additem";
import apiRequest from "./ApiRequest";
function App() {
  const API_URL = "http://localhost:3500/items";
  // {/** npx json-server -p 3500 -w data/db.json*/}
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null); 
  // handling error using usestate
  useEffect(() => {
    // An asynchronous function to fetch items from an API.
    const fetchItems = async () => {
      try {
        // Sending a GET request to the API URL
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received");

        const listTask = await response.json();

        setItems(listTask);
        setFetchError(null);
        // incase of no error setting fetch error to null
      } catch (err) {
        setFetchError(err.message);
        // in case of error display  error message
      }
    };
    (async () => await fetchItems())();
    //  {/*
    //  *(async () => await fetchItems()): is an anonymous arrow function defined using the async function expression. Inside this function, fetchItems() is awaited, making sure that the asynchronous operation completes before proceeding.
    //  * ():  function expression is immediately invoked because it's followed by (). This means the function is executed immediately after its definition.
    //  */}
  }, []);

  //{/** UseEffect hook is being used to fetch items from an API when the component mounts, as indicated by the empty dependency array.*/}

  // AddTask function is async because await is used in result variable.
  const addTask = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    // Calculating the ID for a new item based on the length of the 'items' array.
    const addNewTask = { id, checked: false, item };
    // Creating addNewTask object.
    const newListItems = [...items, addNewTask];
    // AddNewTask is added to the rest of the items.
    setItems(newListItems);

    // Adding new task in server
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/JSON",
      },
      // We have to mention types
      body: JSON.stringify(addNewTask),
    };
    const result = await apiRequest(API_URL, postOptions);
    // Calling apiRequest function with parameters.
    if (result) setFetchError(result);
    // In case of no error default null value ll work or in case of error setFetchError for result variable is shown.
  };

  const [newTask, setNewTask] = useState(" ");
  const handleCheck = async (id) => {
    const listItem = items.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    //{
    /* *Using the map function to iterate over the items array then checking if the id of the current task matches the provided id. If the id matches, creating a new task object with the checked property toggled to the opposite of its current value using !task.checked.If the id does not match, keeping the task object unchanged.*/
    // }
    setItems(listItem);
  const myItem = listItem.filter((item) => item.id === id);
  const updateOptions = {
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({checked:myItem[0].checked})

  }
  const reqUrl = `${API_URL}/${id}`
  const result  = await apiRequest(reqUrl,updateOptions)
  if(result) setFetchError(result) 
  };

  const handleDelete =  async (id) => {
    const delTask = items.filter((task) => task.id !== id);
    setItems(delTask);
    //{
    /**Filtering the items array to exclude the task with the provided ID.*/
    //}
    const deleteOptions = {method:'DELETE'}

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,deleteOptions)
    if(result) fetchError(result)

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent the default form submission behavior
    if (!newTask) return;
    // Checks if the newTask state variable is empty. If it's empty, the function returns early, indicating that no action should be taken.

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
        {fetchError && <p>{`Error:${fetchError}`}</p>}
        {/**In case of error the error message ll be rendered. if there is no error nothing ll render */}
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
