<?php

namespace App\Presenters;

use App\Model\Game\Game;
use App\Model\Game\GameEvent;
use App\Model\Group\Group;
use App\Model\Team\Team;
use App\Model\TeamInGame\TeamInGame;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class GroupPresenter
 * @package App\Presenters
 */
class GroupPresenter extends ResourcePresenter
{
    /** @var EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionReadResults()
    {
        $groupId = $this->getParameter('id');

        /** @var Group $group */
        $group = $this->doctrine->getRepository(Group::getClassName())->find($groupId);
        $teamsInGroup = $group->getTeamMemberships();
        $teams = [];
        foreach ($teamsInGroup as $teamInGroup) {
            $teams[] = $this->getTeamResults($teamInGroup->team);
        }
        $this->resource->data = $teams;
    }

    protected function getTeamResults(Team $team)
    {
        $played = 0;
        $wins = 0;
        $ties = 0;
        $loses = 0;
        $goalsShooted = 0;
        $goalsReceived = 0;
        foreach ($team->gameMemberships as $gameMembership) {
            if ($gameMembership->relationship === TeamInGame::RELATIONSHIP_REFEREE) {
                continue;
            }

            /** @var Game $game */
            $game = $gameMembership->game;

            if ($game->state === Game::GAME_STATE_FINISHED || $game->state === Game::GAME_STATE_CLOSED) {
                $teamScore = 0;
                $opponentScore = 0;
                $gameEvents = $game->gameEvents;
                foreach ($gameEvents as $gameEvent) {
                    if ($gameEvent->type === GameEvent::GAME_EVENT_TYPE_GOAL) {
                        if ($gameEvent->player->team->id === $team->id) {
                            $teamScore++;
                            $goalsShooted++;
                        } else {
                            $opponentScore++;
                            $goalsReceived++;
                        }
                    }
                }

                $played++;
                if ($teamScore === $opponentScore) {
                    $ties++;
                } elseif ($teamScore > $opponentScore) {
                    $wins++;
                } else {
                    $loses++;
                }
            }
        }

        return [
            'rank' => 11,
            'teamName' => $team->getName(),
            'played' => $played,
            'wins' => $wins,
            'ties' => $ties,
            'loses' => $loses,
            'score' => $goalsShooted . ':' . $goalsReceived,
            'points' => 4,
        ];
    }
}