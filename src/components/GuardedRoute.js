import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { loggedInUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedInUser ? <Component {...props} /> : <Redirect exact to='/' />
      }
    />
  );
};

export default GuardedRoute;
