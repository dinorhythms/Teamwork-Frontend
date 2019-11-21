import React from 'react'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_CANCEL } from '../../store/types/authTypes';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch({ type: AUTH_CANCEL });
  const { isAuthenticated, status } = useSelector(state => state.auth);
  if (status === 'idle' && !isAuthenticated) return <Redirect to="/login" />
  return;
}

export default Logout;