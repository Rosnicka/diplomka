import React, {Component} from 'react';
import {connect} from 'react-redux';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./App";

import UserLoginPage from "../pages/users/UserLoginPage";
import UserRegistrationPage from "../pages/users/UserRegistrationPage";

const mapStateToProps = (state) => {
    return {
        userIdentity: state.userIdentity,
    }
};

const mapDispatchToProps = (dispatch, state) => {
    return {

    };
};

const RouterContainer = (props) => {
    const {userIdentity} = props;

    if (userIdentity.id === undefined) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/registrace" component={UserRegistrationPage}/>
                    <Route path="*" component={UserLoginPage}/>
                </Switch>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouterContainer)
