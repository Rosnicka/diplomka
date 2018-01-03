import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import PlayerRepository from "./players/PlayerRepository";
import MyTeamHomePage from "../pages/my-team/MyTeamHomePage";

import GameRepository from "./games/GameRepository";
import GameDetailPage from "../pages/game-detail/GameDetailPage";
import GroupTablePage from "../pages/group-table/GroupTablePage";

const AuthRouter = (props) => {
    const {myTeam} = props;

    const renderBrowserRouter = () => {
        if (myTeam.id === undefined) {
            return (
                <BrowserRouter>
                    <div>
                        <Nav bsStyle="pills">
                            <LinkContainer exact to="/">
                                <NavItem eventKey={1}>Můj tým</NavItem>
                            </LinkContainer>
                        </Nav>

                        <Switch>
                            <Route exact path="/" component={MyTeamHomePage}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            )
        } else if (
            myTeam.competition === null || myTeam.league === null || myTeam.group === null ||
            myTeam.competition === undefined || myTeam.league === undefined || myTeam.group === undefined
        ) {
            return (
                <BrowserRouter>
                    <div>
                        <Nav bsStyle="pills">
                            <LinkContainer exact to="/">
                                <NavItem eventKey={1}>Můj tým</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/hraci">
                                <NavItem eventKey={2}>Hráči</NavItem>
                            </LinkContainer>
                        </Nav>

                        <Switch>
                            <Route exact path="/" component={MyTeamHomePage}/>
                            <Route exact path="/hraci" component={PlayerRepository}/>
                            <Route path="/hraci/novy-hrac" component={PlayerRepository}/>
                            <Route path="/hraci/:id" component={PlayerRepository}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            )
        } else {
            return (
                <BrowserRouter>
                    <div>
                        <Nav bsStyle="pills">
                            <LinkContainer exact to="/">
                                <NavItem eventKey={1}>Můj tým</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/hraci">
                                <NavItem eventKey={2}>Hráči</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/zapasy">
                                <NavItem eventKey={3}>Zápasy</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/tabulka">
                                <NavItem eventKey={4}>Tabulka</NavItem>
                            </LinkContainer>
                        </Nav>

                        <Switch>
                            <Route exact path="/" component={MyTeamHomePage}/>
                            <Route exact path="/hraci" component={PlayerRepository}/>
                            <Route path="/hraci/novy-hrac" component={PlayerRepository}/>
                            <Route path="/hraci/:id" component={PlayerRepository}/>
                            <Route exact path="/zapasy" component={GameRepository}/>
                            <Route path="/zapasy/:id" component={GameDetailPage}/>
                            <Route path="/tabulka" component={GroupTablePage}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            )
        }
    }

    return renderBrowserRouter();
}

export default AuthRouter;
