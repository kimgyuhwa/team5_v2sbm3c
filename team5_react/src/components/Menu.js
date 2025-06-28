// src/components/Menu.js
<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/user/login">Login</Link> |{" "}
      <Link to="/user/logout">Logout</Link> |{" "}
      <Link to="/user/session">Session Info</Link>
=======
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

function Menu() {
  const { loginUser } = useContext(GlobalContext);
  console.log("loginUser:", loginUser);

  return (
    <nav>
      <Link to="/">홈</Link> |{" "}
      <Link to="/components/main">메인창</Link> |{" "}
      <Link to="/user/login">로그인</Link> |{" "}
      <Link to="/user/logout">로그아웃</Link> |{" "}
      <Link to="/user/register">회원가입</Link> |{" "}
      <Link to="/user/profile">회원정보</Link> |{" "}
      <Link to="/reservation/Reservation">예약ex</Link> |{" "}
      <Link to="/reservation/Place">강의실조회</Link> |{" "}
      <Link to="/user/session">Session Info</Link> |{" "}
      <Link to="/chat">Chat</Link> |{" "}
      {loginUser && loginUser.role === "admin" && (
        <>
          {" | "}<Link to="/talent/categrp">CateGrp(대분류)</Link>
          {" | "}<Link to="/talent/category">Category(소분류)</Link>
          {" | "}<Link to="/talent/type">Type</Link>
        </>

      )}
      <Link to="/review/review">리뷰</Link>
>>>>>>> 475490306b1012c2ac49fc2f5f7aa49c5cab35c6
    </nav>
  );
}

export default Menu;