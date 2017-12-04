import React from 'react';
import {connect} from 'react-redux';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


import App from "../containers/App";
import UserLoginPage from "../pages/users/UserLoginPage";
import UserRegistrationPage from "../pages/users/UserRegistrationPage";
import PlayerRepository from "./players/PlayerRepository";
import TeamRepository from "./teams/TeamRepository";
import MyTeamHomePage from "../pages/my-team/MyTeamHomePage";
import LoadingSpinner from "../components/utils/LoadingSpinner";
import GameRepository from "./games/GameRepository";
import TeamGroupResultElement from "../components/group/TeamGroupResultElement";
import GroupRepository from "./group/GroupRepository";

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
                        <Nav bsStyle="pills">
                            <LinkContainer to="/">
                                <NavItem eventKey={1}>Můj tým</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/hraci">
                                <NavItem eventKey={2}>Hráči</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/zapasy">
                                <NavItem eventKey={3}>Zápasy</NavItem>
                            </LinkContainer>
                        </Nav>

                        <Switch>
                            <Route path="/hraci" component={PlayerRepository}/>
                            <Route path="/tymy" component={TeamRepository}/>
                            {/*<Route path="/" component={GameRepository}/>*/}
                            <Route path="/" component={MyTeamHomePage}/>
                            {/*<Route path="/" component={App}/>*/}
                            {/*<Route path="/" component={GroupRepository}/>*/}
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
