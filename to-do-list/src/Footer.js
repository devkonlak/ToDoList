import React from 'react';

const Footer = () =>{
    const year = new Date();
    return(
        <footer>Copyright &copy; {year.getFullYear()}</footer>
        /*getFullYear() is a method provided by JavaScript's Date object. */
    )
}
export default Footer; 