import React, {Component} from 'react'
import {Col} from 'react-bootstrap'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from '../reducers/index';

import {getLoggedUser} from "../actions/users/UsersActions";
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
                        <div className="title">Informační systém pro soutěže v malé kopané</div>
                        <img src="/images/logo_makop.png"/>
                    </header>
                    <Col xs={12}>
                        <RouterContainer/>
                    </Col>
                </div>
            </Provider>
        )
    }
}

export default DispatchingApp