import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './Components/Header'
import Complaint from './Components/AnonymousComp/Complaint'
import Login from './Components/Login'
import UserComplaint from './Components/User/Comform'
import AdminLogin from './Components/Admin/AdminLogin'
import AdminHome from './Components/Admin/AdminHome'
import User from './Components/User/UserHome'



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/complaint" component={Complaint} />
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/admin-home" component={AdminHome} />


        <Route path="/user-home" component={User} />
        <Route path="/user-complaint" component={UserComplaint} />
                
      </div>
    </BrowserRouter>
  );
}

export default App;
