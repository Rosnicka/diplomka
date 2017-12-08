import React from 'react';
import {connect} from 'react-redux';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import UserLoginPage from "../pages/users/UserLoginPage";
import UserRegistrationPage from "../pages/users/UserRegistrationPage";
import LoadingSpinner from "../components/utils/LoadingSpinner";
import AuthRouter from "./AuthRouter";

const mapStateToProps = (state) => {
    return {
        userIdentity: state.users.userIdentity,
        isFetchingUser: state.users.isFetchingUser,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const RouterContainer = (props) => {
    const {userIdentity, isFetchingUser} = props;

    const showSpinnerOrContent = () => {
        if (isFetchingUser) {
            return (
                <LoadingSpinner text="Načítám aplikaci"/>
            )
        } else {
            return (
                <div>
                    {showLoginOrContent()}
                </div>
            )
        }
    }

    const showLoginOrContent = () => {
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
            return <AuthRouter/>
        }
    }

    return showSpinnerOrContent()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouterContainer)
