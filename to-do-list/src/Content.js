import React from "react";
import { useState } from "react";
import { FaTrashArrowUp } from "react-icons/fa6";

const Content = () => {
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
  };

  const handleDelete = (id) => {
      const delTask = items.filter( (task) => task.id !== id)
      setItems(delTask)
      {/**Filtering the items array to exclude the task with the provided ID */}

  };
  return (
    <main>
      {/*using map to iterate the default items in unordered list */}
      <ul>
        {items.map((task) => (
          <li className="item" key={task.id}>
            {/**With key={item.id}, each list item will be uniquely identified by its id. and also helps in controling states */}
            <input
              type="checkbox" /* type attribute helps to mention type of input */
              onChange={() => handleCheck(task.id)}
              checked={
                task.checked
              } /*this will check the  weather the item is checked or not*/
            />
            <label>{task.item}</label> {/**gathering lable from items  */}
            <button aria-label="Delete">
              <FaTrashArrowUp
                role="button"
                tabIndex="0"
                onClick={() => handleDelete(task.id)}
              />
            </button>
            {/*<FaTrashArrowUp /> adds trash can icon Tabindex ll helps in focusing delete icon by keyboard navigation */}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Content;
