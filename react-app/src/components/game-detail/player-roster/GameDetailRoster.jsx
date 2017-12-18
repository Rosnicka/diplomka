import React from 'react';
import {Alert} from 'react-bootstrap'
import GameDetailRosterPlayerList from "./GameDetailRosterPlayerList";
import GameDetailRosterAddPlayer from "./GameDetailRosterAddPlayer";
import LoadingSpinner from "../../utils/LoadingSpinner";

const GameDetailRoster = (props) => {
    const {isCaptain, myPlayers, playersOnRoster} = props;

    const renderAddPlayer = () => {
        if (!isCaptain) {
            return (
                <Alert bsStyle="warning">
                    Nejste kapitán tohoto týmu
                </Alert>
            )
        } else if (playersOnRoster === false || myPlayers === false) {
            return <LoadingSpinner text="Načítám hráče pro soupisku"/>;
        } else {
            return <GameDetailRosterAddPlayer {...props}/>
        }
    }

    return (
        <div>
            {renderAddPlayer()}
            <GameDetailRosterPlayerList {...props} />
        </div>
    );
};

export default GameDetailRoster;
