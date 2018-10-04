
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import Main from './Main';
import {getStore} from "./storeCreator";
import createHistory from 'history/createBrowserHistory';
import {Route, Switch} from "react-router-dom";
import About from "./About";
import Error from "./Error";
import {ConnectedRouter} from "react-router-redux";
import Track from "./Track";

const store = getStore();
const history = createHistory();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter  history={history}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/Main" component={Main}/>
                <Route path="/About" component={About}/>
                <Route path="/Main/Search/:name" component={Main}/>
                <Route path="/Main/track/:id" component={Track}/>
                <Route path="*" component={Error}/>
            </Switch>
        </ConnectedRouter >
    </Provider>,
    document.getElementById('root')
);