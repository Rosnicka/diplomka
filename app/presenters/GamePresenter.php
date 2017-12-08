<?php

namespace App\Presenters;

use App\Model\Game\Game;
use App\Model\PlayerInGame\PlayerInGame;
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

    public function actionReadPlayers()
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

    public function actionReadEvents()
    {
        $gameId = $this->getParameter('id');
        $game = $this->doctrine->getRepository(Game::getClassName())->find($gameId);

        $data = [];
        foreach ($game->gameEvents as $row) {
            $gameEvent = $row->getData();
            $player = $row->player;
            $team = $player->team;
            $gameEvent['player'] = $player->firstName . ' ' . $player->lastName;
            $gameEvent['team'] = $team->name;

            $data[] = $gameEvent;
        }
        $this->resource->data = $data;
    }

}