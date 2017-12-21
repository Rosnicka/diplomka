import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import PlayerRepository from "./players/PlayerRepository";
import MyTeamHomePage from "../pages/my-team/MyTeamHomePage";

import GameRepository from "./games/GameRepository";
import GameDetailPage from "../pages/game-detail/GameDetailPage";
import GroupTablePage from "../pages/group-table/GroupTablePage";

class AuthRouter extends Component {
    render() {
        return (
            <BrowserRouter onChange={this.onRouteChanged}>
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
                        <LinkContainer to="/tabulka">
                            <NavItem eventKey={4}>Tabulka</NavItem>
                        </LinkContainer>
                    </Nav>

                    <Switch>
                        <Route exact path="/" component={MyTeamHomePage}/>
                        <Route exact path="/hraci" component={PlayerRepository} />
                        <Route path="/hraci/novy-hrac" component={PlayerRepository} />
                        <Route path="/hraci/:id" component={PlayerRepository} />
                        <Route exact path="/zapasy" component={GameRepository}/>
                        <Route path="/zapasy/:id" component={GameDetailPage}/>
                        <Route path="/tabulka" component={GroupTablePage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default AuthRouter;
