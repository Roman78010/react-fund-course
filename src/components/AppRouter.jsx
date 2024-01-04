import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privatRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)
  
  if (isLoading) {
    return <Loader/>
  }
  
  return (
    isAuth
    ?
      <Routes>
        {privatRoutes.map(route => 
          <Route
            path={route.path}
            element={route.element}
            key={route.path}
          />
        )}
      </Routes>
    :
      <Routes>
        {publicRoutes.map(route => 
          <Route
            path={route.path}
            element={route.element}
            key={route.path}
          />
        )}
      </Routes>
  );
};

export default AppRouter;