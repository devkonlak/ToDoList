import React from "react";
import { FaTrashArrowUp } from "react-icons/fa6";

{/**{items,handleCheck,handleDelete} props are destructured from the props object in the function parameter list, allowing direct access to them within the component. */}
const Content = ({items,handleCheck,handleDelete}) => {
  
  return (
    <>
      {/**if the items.length has value display list or display "list is empty" */}
      {(items.length) ? (<ul>
      {/*using map to iterate the default items in unordered list */}
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
            <label 
            style={(task.checked) ? {textDecoration:'line-through'} : null}>
            {task.item}
            </label> {/**gathering lable from items  || if the task.checked is true then the text-decoration ll be line-through */}
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
      </ul>) : 
      (<p> Your list is empty </p>) }
      
      
    </>
  );
};

export default Content;
