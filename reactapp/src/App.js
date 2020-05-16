import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';

import wishlist from './reducers/article.reducer';
import token from './reducers/token.reducer';
import selectLanguage from './reducers/language.reducer';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({wishlist, token, selectLanguage}));

function App() {
  return (

    <Provider store={store}>

      <Router>

        <Switch>
          <Route path='/' exact component={ScreenHome}/>
          <Route path='/screensource' exact component={ScreenSource}/>
          <Route path='/screenarticlesbysource/:id' exact component={ScreenArticlesBySource}/>
          <Route path='/screenmyarticles' exact component={ScreenMyArticles}/>
        </Switch>

      </Router>
      
    </Provider>

  );
};

export default App;
