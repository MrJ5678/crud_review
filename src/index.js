import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import GamesPage from './components/GamesPage'
import GameFormPage from './components/GameFormPage'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(logger, thunk)
  )
)

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <div className="ui container">
        <div className="ui three item menu">
          <NavLink exact activeClassName="active" to="/" className="item">Home</NavLink>
          <NavLink exact to="/games" className="item">Games</NavLink>
          <NavLink exact to="/games/new" className="item">Add new game</NavLink>
        </div>
        <Route exact path='/' component={App} />
        <Route exact path='/games' component={GamesPage} />
        <Route exact path='/games/new' component={GameFormPage} />
        <Route exact path='/games/:_id' component={GameFormPage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);