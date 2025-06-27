// src/components/Menu.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

function Menu() {
  const { loginUser } = useContext(GlobalContext);

  return (
    <nav>
<<<<<<< HEAD
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
      
=======

      <Link to="/">홈</Link> |{" "}
      <Link to="/user/login">로그인</Link> |{" "}
      <Link to="/user/logout">로그아웃</Link> |{" "}
      <Link to="/user/register">회원가입</Link> |{" "}
      <Link to="/user/profile">회원정보</Link> |{" "}
      <Link to="/user/session">Session Info</Link>
      <Link to="/chat">Chat</Link> |{" "}
      <Link to="/talent/categrp">CateGrp(대분류)</Link> |{" "}
      <Link to="/talent/category">Category(소분류)</Link>  |{" "}
      <Link to="/talent/type">type</Link>
      <Link to="/review/review">리뷰</Link>

>>>>>>> 49ee96a0445d501b4105cbe814237517a83e933e
    </nav>
  );
}

export default Menu;