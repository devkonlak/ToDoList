import React from 'react'
import { FaPlus } from 'react-icons/fa6'

const Additem = () => {
  return (
    <form className='addForm'>
        <label htmlFor="addTask">Add Task</label>
        <input 
        type="text"
        id='addTask'
        placeholder='Add Task'
        required
         />
         <button
         type='submit' 
         >
        <FaPlus/>
         </button>
    </form>
    
  )
}

export default Additem