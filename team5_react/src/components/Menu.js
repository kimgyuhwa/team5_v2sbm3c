// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>

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

    </nav>
  );
}

export default Menu;