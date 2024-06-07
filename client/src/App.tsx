import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router'

import Home from './pages/Home'
import Game from './pages/Game'

const App: Component = () => {
  return (
    <Router>
      <Route path='/' component={Home} />
      <Route path='/play' component={Game} />
    </Router>
  );
};

export default App;
