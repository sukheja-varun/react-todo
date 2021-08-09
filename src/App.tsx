import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from './pages/About';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';

import Header from './components/molecules/Header';
import Notification from './components/molecules/Notification';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Notification />
      <BrowserRouter>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path={['/', '/todos']} component={Todos} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
