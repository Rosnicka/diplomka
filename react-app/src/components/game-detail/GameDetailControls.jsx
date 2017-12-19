import React from 'react';
import {Col} from 'react-bootstrap'
import {GAME_STATE_PAUSED, GAME_STATE_PLAYING, GAME_STATE_PREPARED} from "../../constants/GameStateTypes";

const GameDetailControls = (props) => {
    const {gameHeader, gameState, onClickStartGame, onClickPauseGame, onClickResumeGame, onClickEndGame} = props;

    const btnStartGame = () => {
        if (gameState === GAME_STATE_PREPARED) {
            return (
                <button className="btn btn-success" onClick={() => onClickStartGame(gameHeader.id)}>Zahájit zápas</button>
            )
        } else {
            return '';
        }
    }

    const btnPauseGame = () => {
        if (gameState === GAME_STATE_PLAYING) {
            return (
                <button className="btn btn-info" onClick={() => onClickPauseGame(gameHeader.id)}>Pozastavit zápas</button>
            )
        } else {
            return '';
        }
    }

    const btnResumeGame = () => {
        if (gameState === GAME_STATE_PAUSED) {
            return (
                <button className="btn btn-success" onClick={() => onClickResumeGame(gameHeader.id)}>Pokračovat v zápase</button>
            )
        } else {
            return '';
        }
    }

    const btnEndGame = () => {
        if (gameState === GAME_STATE_PLAYING || gameState === GAME_STATE_PAUSED) {
            return (
                <button className="btn btn-danger" onClick={() => onClickEndGame(gameHeader.id)}>Ukončit zápas</button>
            )
        } else {
            return '';
        }
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
