import React from 'react';
import {Col} from 'react-bootstrap'
import {GAME_STATE_PAUSED, GAME_STATE_PLAYING, GAME_STATE_PREPARED} from "../../constants/GameStateTypes";

const GameDetailControls = (props) => {
    const {gameHeader, onClickStartGame, onClickPauseGame, onClickResumeGame, onClickEndGame} = props;

    const btnStartGame = () => {
        if (gameHeader.state !== GAME_STATE_PREPARED) {
            return '';
        }

        return (
            <button className="btn btn-success" onClick={() => onClickStartGame(gameHeader.id)}>Zahájit zápas</button>
        )
    }

    const btnPauseGame = () => {
        if (gameHeader.state !== GAME_STATE_PLAYING) {
            return '';
        }

        return (
            <button className="btn btn-info" onClick={() => onClickPauseGame(gameHeader.id)}>Pozastavit zápas</button>
        )
    }

    const btnResumeGame = () => {
        if (gameHeader.state !== GAME_STATE_PAUSED) {
            return '';
        }

        return (
            <button className="btn btn-success" onClick={() => onClickResumeGame(gameHeader.id)}>Pokračovat v zápase</button>
        )
    }

    const btnEndGame = () => {
        if (gameHeader.state !== GAME_STATE_PLAYING || gameState !== GAME_STATE_PAUSED) {
            return '';
        }

        return (
            <button className="btn btn-danger" onClick={() => onClickEndGame(gameHeader.id)}>Ukončit zápas</button>
        )
    }

    return (
        <Col xs={6} xsOffset={3} className="text-center">
            {btnStartGame()}
            {btnPauseGame()}
            {btnResumeGame()}
            {btnEndGame()}
        </Col>
    );
};

export default GameDetailControls;
