<?php

namespace App\Model\Game;

use App\Model\BaseEntity;
use App\Model\Player\Player;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class GameEvent extends BaseEntity
{
    const GAME_EVENT_TYPE_GOAL = 'goal';
    const GAME_EVENT_TYPE_ASSIST = 'assist';
    const GAME_EVENT_TYPE_YELLOW_CARD = 'yellow_card';
    const GAME_EVENT_TYPE_RED_CARD = 'red_card';

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $type;

    /**
     * @ORM\Column(type="datetime")
     * @var string
     */
    protected $created;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $minute;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Game\Game", inversedBy="gameEvents")
     * @var Game
     */
    protected $game;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Player\Player", inversedBy="gameEvents")
     * @var Player
     */
    protected $player;
}