import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.css'
import { FirebaseProvider } from './context/firebase';
import firebaseApp from './utils/firebase';
import React from 'react';

function App() {

  return (
    <>
      <FirebaseProvider value={firebaseApp}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home}></Route>
          </Switch>
        </Router>
      </FirebaseProvider>
    </>
  );
}

export default App;
