import React, { useState, useEffect } from "react";
import "./Nav.css";
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

function Nav() {
  const [shownav, setShownav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShownav(true);
      } else setShownav(false);
    });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  return (
    <div className={`nav ${shownav && "nav-black"}`}>
      <Link to="/">
        <img
          className="nav-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
          alt="Netflix Logo"
        />
      </Link>
      
      <Link to="/Searchpage">
          <SearchIcon className="nav-search-icon"/>
      </Link>

      <img
        className="nav-avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;
