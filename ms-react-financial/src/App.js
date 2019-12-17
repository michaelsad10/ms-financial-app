import React, { Component } from 'react';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import './index.css';
import Expenses from './Pages/Expenses';
import Invest from './Pages/Invest';
import Taxes from './Pages/Taxes';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import history from './Pages/history';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      id: 0,
    };
  }

  loginStatus = (loggedIn, id) => {
    this.setState({loggedIn : loggedIn})
    this.setState({id : id})
  }

  render() {
    const routing = (
      <div>
        <BrowserRouter history={history}>
            <Route  exact path="/" render={props => (
              <Login {...props} loggedIn={this.state.loggedIn} id={this.state.id} getStatus={this.loggedIn} />)}>
            </Route>
            <Route  path="/expenses/:id" render={props => (
              <Expenses {...props}/>)}>
            </Route>
            <Route  path="/invest/:id" render={props => (<Invest {...props}/>)}>
            </Route>
            <Route  path="/taxes/:id" render={props=> (<Taxes{...props}/>)}>
            </Route>
            <Route  path="/login" render={props => (
              <Login {...props} loggedIn={this.state.loggedIn} id={this.state.id} getStatus={this.loggedIn} />
            )}>
            </Route>
            <Route  path="/signup" render={props => (
              <Signup {...props} loggedIn={this.state.loggedIn} id={this.state.id} getStatus={this.loggedIn} />
            )}>
            </Route>
        </BrowserRouter>
      </div>)
    return (
      <div>
        {routing}
      </div>
    );
  }
}

export default App;
