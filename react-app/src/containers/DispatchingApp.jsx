import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from '../reducers/index';

import {getLoggedUser} from "../actions/UsersActions";
import RouterContainer from "../containers/RouterContainer"

const middleware = [thunk];
export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleware));

store.dispatch(getLoggedUser());

class DispatchingApp extends Component {
    render() {

        return (
            <Provider store={store}>
                <div className="wrapper">
                    <header>
                        <h1>Informační systém pro soutěže v malé kopané</h1>
                        <img src="/images/logo_makop.png"/>
                    </header>
                    <RouterContainer/>
                </div>
            </Provider>
        )
    }
}

export default DispatchingApp