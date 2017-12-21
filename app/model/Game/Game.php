<?php

namespace App\Model\Game;

use App\Model\BaseEntity;
use App\Model\Field\Field;
use App\Model\Group\Group;
use App\Model\PlayerInGame\PlayerInGame;
use App\Model\TeamInGame\TeamInGame;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Game extends BaseEntity
{
    const GAME_STATE_FILLING_ROSTER = 'filling_roster';
    const GAME_STATE_PREPARED = 'prepared';
    const GAME_STATE_PLAYING = 'playing';
    const GAME_STATE_PAUSED = 'paused';
    const GAME_STATE_FINISHED = 'finished';
    const GAME_STATE_CLOSED = 'closed';


    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $round;

    /**
     * @ORM\Column(type="datetime")
     * @var string
     */
    protected $datetime;

    /**
     * @ORM\Column(type="datetime")
     * @var string
     */
    protected $lastStartDatetime;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $elapsedSeconds;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $state;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Field\Field")
     * @var Field
     */
    protected $field;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Group\Group", inversedBy="gameMemberships")
     * @var Group
     */
    protected $group;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\TeamInGame\TeamInGame", mappedBy="game")
     * @var ArrayCollection|TeamInGame[]
     */
    protected $teamMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\PlayerInGame\PlayerInGame", mappedBy="game")
     * @var ArrayCollection|PlayerInGame[]
     */
    protected $playerMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Game\GameEvent", mappedBy="game")
     * @var ArrayCollection|GameEvent[]
     */
    protected $gameEvents;

    public function getGameData()
    {
        $data = $this->getData();
        foreach ($this->teamMemberships as $teamMembership) {
            $data[$teamMembership->relationship] = $teamMembership->team->getData();
        }
        $data['datetime'] = $this->datetime->format('Y.m.d H:m');
        $data['last_start_datetime'] = $this->lastStartDatetime->format('Y.m.d H:m:s');
        $data['field'] = $this->field->name;
        $data['result']['home'] = 0;
        $data['result']['host'] = 2;

        return $data;
    }
}