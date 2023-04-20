import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

export { PrivateRoute };

function PrivateRoute({ component }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
   const isAdmin = useSelector(state=>state.admin.isAuthenticated) 
    if (isAuthenticated||isAdmin) {
        // not logged in so redirect to login page with the return url
        return component;
    }
    return <Navigate to="/"  />

    // authorized so return child components
}