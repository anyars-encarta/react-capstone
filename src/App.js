import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Countries from './components/Countries';
import Continents from './components/Continents';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/countries/:continentName" component={Countries} />
      <Route path="/">
        <Continents />
      </Route>
    </Switch>
  </Router>
);

export default App;
