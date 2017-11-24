import React from 'react';
import {connect} from 'react-redux';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./App";

import UserLoginPage from "../pages/users/UserLoginPage";
import UserRegistrationPage from "../pages/users/UserRegistrationPage";
import PlayerRepository from "./players/PlayerRepository";
import TeamRepository from "./teams/TeamRepository";
import NavLink from "react-router-dom/es/NavLink";
import MyTeamHomePage from "../pages/my-team/MyTeamHomePage";
import LoadingSpinner from "../components/utils/LoadingSpinner";

const mapStateToProps = (state) => {
    return {
        userIdentity: state.users.userIdentity,
        isFetchingUser: state.users.isFetchingUser
    }
};

const mapDispatchToProps = (dispatch, state) => {
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
            return (
                <BrowserRouter>
                    <div>
                        <div className="navigation">
                            <NavLink to="/">Můj tým</NavLink><br/>
                            <NavLink to="/hraci">Hráči</NavLink><br/>
                            <NavLink to="/tymy">Zápasy</NavLink><br/>
                        </div>
                        <Switch>
                            <Route path="/muj-tym" component={MyTeamHomePage}/>
                            <Route path="/hraci" component={PlayerRepository}/>
                            <Route path="/tymy" component={TeamRepository}/>
                            <Route path="/*" component={App}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            )
        }
    }

    return showSpinnerOrContent()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouterContainer)
