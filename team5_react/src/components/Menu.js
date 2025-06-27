// src/components/Menu.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

function Menu() {
  const { loginUser } = useContext(GlobalContext);

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/user/login">Login</Link> |{" "}
      <Link to="/user/logout">Logout</Link> |{" "}
      <Link to="/user/session">Session Info</Link> |{" "}
      <Link to="/chat">Chat</Link>  |{" "}
      <Link to="/talent/post">talent</Link>
      
      {loginUser && loginUser.role === "admin" && (
        <>
          {" | "}<Link to="/talent/categrp">CateGrp(대분류)</Link>
          {" | "}<Link to="/talent/category">Category(소분류)</Link>
          {" | "}<Link to="/talent/type">Type</Link>
        </>

      )}
      
    </nav>
  );
}

export default Menu;