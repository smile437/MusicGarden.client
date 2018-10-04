
import {createStore, applyMiddleware} from "redux";
import reducer from './reducers';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";


export function getStore() {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}