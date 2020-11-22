import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Categories from './components/Categories';
import Expense from './components/Expense';
import EditForm from './components/EditForm';
import Register from './components/Register';
import axios from 'axios';
const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };
  const logout = () => {
    axios.post('/logout').then(response => {
      if (response.status === 204) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
      }
    })
  };
  const authLink = loggedIn
    ? <button onClick={logout} className="nav-link btn btn-link"><h4>Logout</h4></button>
    : <NavLink to='/login' className="nav-link"><h4>Login</h4></NavLink>;
    const regLink = loggedIn
    ? <NavLink to='#' className="nav-link"></NavLink>
    : <NavLink to='/register' className="nav-link"><h4>Register</h4></NavLink>;
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to='/expenses' className="nav-link"><h4>Expenses</h4></NavLink>
          </li>
          <li className="nav-item">
            {authLink}
          </li>
          <li className="nav-item">
            {regLink}
          </li>
        </ul>
        </div>
      </nav>
      <div className=" mt-5 pt-5" >
        <Switch>
          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
           <Route path='/register' render={props => (
            <Register {...props} login={login} />
          )} />
          <Route path='/categories' render={props => (
            <Categories {...props} loggedIn={loggedIn} />
          )} />
           <Route path='/expenses' render={props => (
            <Expense {...props} loggedIn={loggedIn} />
          )} />
           <Route path='/editExpense' render={props => (
            <EditForm {...props} loggedIn={loggedIn} />
          )} />
        </Switch>
      </div>
    </Router>
  );
};
export default App