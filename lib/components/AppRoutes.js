import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Home/HomePage';
import FootballPage from './Football/FootballPage';
import ProfilePage from './Profile/ProfilePage';
import UsersPage from './Users/UsersPage';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const AppRoutes = () => (
  <Switch>
    <Route exact path='/' component={HomePage}/>
    <Route path='/home' component={HomePage}/>
    <Route path='/football' component={FootballPage}/>
    <Route path='/index.html' component={HomePage}/>
    <Route path='/users' component={UsersPage}/>
    <Route path='/profile' component={ProfilePage}/>
  </Switch>
);

export default AppRoutes;
