import React,{ useRef, useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Nav from './Nav';
import './Searchpage.css';
// import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Searchpage() {
    const history = useHistory();
    const inputRef = useRef();

    function handleClick(e){
        e.preventDefault();

        console.log(inputRef.current.value);
        history.push(`/Searchpage/${inputRef.current.value}`);
    }
    
    return (
        <div>
          <Nav/>
          <div className="searchpage">
             <form>
                 <input type="text" ref={inputRef} placeholder="Search movies"/>
                 
                <button onClick={handleClick}>
                       <SearchIcon/>
                </button>
                

             </form>
          </div>
        </div>
    )
}

export default Searchpage