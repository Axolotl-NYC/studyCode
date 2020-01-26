import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import OOPRouteTest from './components/OOPRouteTest.jsx';


/* want to do the routing in our index.js where we actually render the elements

// might be able to pass state into different route paths and components here
// for example if we can pass state into component OOPROUTE TEST
// using the inline render function 

*/

// creating a router component here that will be rendered to 
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/OOP" component={OOPRouteTest} />
    </div>
  </Router>
)



render(routing, document.getElementById('app'));