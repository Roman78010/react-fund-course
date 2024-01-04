import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Log = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  const login = e => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true')
  }
  
  return (
    <div>
      <h1>Page for logining</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Type login"></MyInput>
        <MyInput type="password" placeholder="Type password"></MyInput>
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
};

export default Log;