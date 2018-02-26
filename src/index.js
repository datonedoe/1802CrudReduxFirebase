import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import { Link, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

import "./styles/index.css";
import rootReducer from './reducers';
import Login from "./components/Login";
import Header from './routes/Header';
import NoteDetail from './components/NoteDetail';
import NoteEdit from './components/NoteEdit';
import LoadingComponent from './components/LoadingComponent';
import AuthenticatedComponent from './components/AuthenticatedComponent';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoadingComponent>
        <div>
          <Switch>
              <Route path="/login" component={Login} exact={true} />
              <Redirect from="/logout" to='/login'/>
              <AuthenticatedComponent>
                  <Header />
                  <Route path="/:id/edit" component={NoteEdit} exact={true} />
                  <Route path="/:id" component={NoteDetail} exact={true} />
                  <Route path="/" component={App} exact={true} />
              </AuthenticatedComponent>
          </Switch>
        </div>
      </LoadingComponent>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();


// <Switch>
//   <Route path="/login" exact component={Login}/>
//   <AuthenticatedComponent>
//     <Route path="/" exact component={App}/>
//   </AuthenticatedComponent>
// </Switch>
