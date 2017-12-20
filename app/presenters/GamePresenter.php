<?php

namespace App\Presenters;

use App\Model\Game\Game;
use App\Model\Game\GameEvent;
use App\Model\Player\Player;
use App\Model\PlayerInGame\PlayerInGame;
use App\Model\Team\Team;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class GamePresenter
 * @package App\Presenters
 */
class GamePresenter extends ResourcePresenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionRead()
    {

        $id = $this->getParameter('id');
        $data = false;

        /** @var Game $game */
        if ($id !== null) {
            $game = $this->doctrine->getRepository(Game::getClassName())->find($id);
            if ($game !== null) {
                $data = $game->getGameData();
            }
        } else {
            $games = $this->doctrine->getRepository(Game::getClassName())->findAll();

            $data = [];
            foreach ($games as $game) {
                $data[] = $game->getGameData();
            }
        }

        $this->resource->data = $data;
    }

    public function actionUpdate()
    {
        $id = $this->getParameter('id');

        if ($id !== null) {
            $this->resource->data = false;
        }

        /** @var Game $game */
        $game = $this->doctrine->getRepository(Game::getClassName())->find($id);
        foreach ($this->getInput()->getData() as $key => $col) {
            if ($key === 'lastStartDatetime') {
                $game->{$key} = new \DateTime($col);
            } else {
                $game->{$key} = $col;
            }
        }
        $this->doctrine->persist($game);
        $this->doctrine->flush();

        $this->resource->data = $game->getGameData();
    }

    public function actionReadTeamPlayers()
    {
        $gameId = $this->getParameter('id');
        $teamId = $this->getParameter('relationId');

        $playersInGame = $this->doctrine->getRepository(PlayerInGame::getClassName())->findBy([
            'game' => $gameId,
            'team' => $teamId,
        ]);

        $players = [];
        /** @var PlayerInGame $playerInGame */
        foreach ($playersInGame as $playerInGame) {
            $players[] = $playerInGame->player->getData();
        }

        $this->resource->data = $players;
    }

    public function actionCreateEvents()
    {
        $gameId = $this->getParameter('id');
        $game = $this->doctrine->getRepository(Game::getClassName())->find($gameId);
        $data = $this->getInput()->getData();
        $player = $this->doctrine->getRepository(Player::getClassName())->find($data['player']);

        $gameEvent = new GameEvent();
        $gameEvent->setGame($game);
        $gameEvent->setPlayer($player);
        $gameEvent->setType($data['type']);
        $gameEvent->setMinute($data['minute']);
        $gameEvent->setCreated(new \DateTime());

        $this->doctrine->persist($gameEvent);
        $this->doctrine->flush();

        $gameEventInfo = $gameEvent->getData();
        $player = $gameEvent->player;
        $team = $player->team;
        $gameEventInfo['player'] = $player->getData();
        $gameEventInfo['team'] = $team->getData();

        $this->resource->data = $gameEventInfo;
    }

    public function actionReadEvents()
    {
        $gameId = $this->getParameter('id');
        $game = $this->doctrine->getRepository(Game::getClassName())->find($gameId);

        $data = [];
        foreach ($game->gameEvents as $row) {
            $gameEvent = $row->getData();
            $player = $row->player;
            $team = $player->team;
            $gameEvent['player'] = $player->getData();
            $gameEvent['team'] = $team->getData();

            $data[] = $gameEvent;
        }
        $this->resource->data = $data;
    }

    public function actionCreatePlayers()
    {
        $gameId = $this->getParameter('id');
        $game = $this->doctrine->getRepository(Game::getClassName())->find($gameId);
        $data = $this->getInput()->getData();

        $team = $this->doctrine->getRepository(Team::getClassName())->find($data['team']);
        $player = $this->doctrine->getRepository(Player::getClassName())->find($data['player']);

        $playerInGame = new PlayerInGame();
        $playerInGame->setGame($game);
        $playerInGame->setPlayer($player);
        $playerInGame->setTeam($team);

        $this->doctrine->persist($playerInGame);
        $this->doctrine->flush();

        $this->resource->data = $player;
    }

    public function actionDeletePlayers()
    {
        $gameId = $this->getParameter('id');
        $playerId = $this->getParameter('relationId');

        $playerInGame = $this->doctrine->getRepository(PlayerInGame::getClassName())->findOneBy([
            'game' => $gameId,
            'player' => $playerId
        ]);

        $this->doctrine->remove($playerInGame);
        $this->doctrine->flush();

        $this->resource->data = true;
    }

}