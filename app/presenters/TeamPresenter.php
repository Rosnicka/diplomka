<?php

namespace App\Presenters;

use App\Model\Game\Game;
use App\Model\Group\Group;
use App\Model\Team\Team;
use App\Model\TeamInGame\TeamInGame;
use App\Model\TeamInGroup\TeamInGroup;
use App\Model\User\User;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class TeamPresenter
 * @package App\Presenters
 */
class TeamPresenter extends ResourcePresenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionCreate()
    {
        $data = $this->getInput()->getData();
        $team = new Team();
        $team->name = $data['name'];

        $this->doctrine->persist($team);
        $this->doctrine->flush();

        $administrator = $this->doctrine->getRepository(User::getClassName())->find($data['administrator']);
        if ($administrator === null) {
            $this->resource->data = false;
            $this->sendResource();
        }
        $administrator->team = $team;
        $this->doctrine->persist($administrator);
        $this->doctrine->flush();

        $this->resource->data = $team;
    }

    public function actionRead()
    {
        $id = $this->getParameter('id');

        if ($id !== null) {
            /** @var Team $team */
            $team = $this->doctrine->getRepository(Team::getClassName())->find($id);
            $teamInGroup = $this->doctrine->getRepository(TeamInGroup::getClassName())->findOneBy(['team' => $team]);
            /** @var Group $group */
            $group = $teamInGroup->group;
            $teamData = $team->getData();
            $teamData['group'] = $group->toArray();
            $teamData['league'] = $group->league->toArray();
            $teamData['competition'] = $group->league->competition->toArray();
            $this->resource->data = $teamData;
        } else {
            $teams = $this->doctrine->getRepository(Team::getClassName())->findAll();
            $teamsData = [];
            /** @var Team $team */
            foreach ($teams as $team) {
                $teamData = $team->getData();
                $teamsData[] = $teamData;
            }

            $this->resource->data = $teamsData;
        }
    }

    public function actionReadPlayers()
    {
        $id = $this->getParameter('id');

        if ($id !== null) {
            $team = $this->doctrine->getRepository(Team::getClassName())->find($id);
            $this->resource->data = $team->players;
        }
    }

    public function actionReadGamesToPlay()
    {
        $this->getTeamGamesByRelationship(['home', 'host']);
    }

    public function actionReadGamesAsReferee()
    {
        $this->getTeamGamesByRelationship(['referee']);
    }

    protected function getTeamGamesByRelationship(array $relationship)
    {
        $id = $this->getParameter('id');

        $games = [];
        if ($id !== null) {
            /** @var TeamInGame $team */
            $teamGameMemberships = $this->doctrine->getRepository(TeamInGame::getClassName())->findBy([
                'team' => $id,
                'relationship' => $relationship,
            ]);

            foreach ($teamGameMemberships as $teamGameMembership) {
                /** @var Game $game */
                $game = $teamGameMembership->game;
                $games[] = $game->getGameData();
            }
        }
        $this->resource->data = $games;
    }
}