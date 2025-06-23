// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/user/login">Login</Link> |{" "}
      <Link to="/user/logout">Logout</Link> |{" "}
      <Link to="/user/session">Session Info</Link>
    </nav>
  );
}

export default Menu;