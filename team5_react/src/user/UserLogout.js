import React, { useContext, useEffect } from 'react';
import '../App.css';
import { GlobalContext } from '../components/GlobalContext';
import { getIP } from '../components/Tool';

function UserLogout() {
  const { setSw, setUserno } = useContext(GlobalContext);

  useEffect(() => {
    fetch(`http://${getIP()}:9093/user/logout`, {
      method: 'GET'
    })
      .then(result => result.text())
      .then(text => {
        console.log('->', text);
        setSw(false);
        setUserno(0);
      })
      .catch(err => console.error(err));
  }, [setSw, setUserno]);

  return (
    <>
      <h5>이용해 주셔서 감사합니다. 즐거운 하루 되세요~</h5>
    </>
  );
}

export default UserLogout;