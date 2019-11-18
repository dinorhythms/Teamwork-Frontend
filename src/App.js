import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// views
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import NotFound from './views/Notfound/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
