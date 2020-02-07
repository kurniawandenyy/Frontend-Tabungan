import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './web/Main'
import { Provider } from 'react-redux'
import store from './web/redux/store'

function App() {
  return (
    <>
      <Main />
    </>
  );
}

function Root(){
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

export default Root;
