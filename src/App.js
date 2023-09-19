import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Countries from './components/Countries'; // The new component
import Continents from './components/Continents';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Continents} />
      {/* Add a route for displaying countries */}
      <Route path="/countries/:continentName" component={Countries} />
    </Switch>
  </Router>
);

export default App;
