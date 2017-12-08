<?php

namespace App\Model\PlayerInGame;

use App\Model\BaseEntity;
use App\Model\Game\Game;
use App\Model\Player\Player;
use App\Model\Team\Team;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class PlayerInGame extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Game\Game", inversedBy="playerMemberships")
     * @var Game
     */
    protected $game;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Player\Player", inversedBy="gameMemberships")
     * @var Player
     */
    protected $player;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Team\Team", inversedBy="playersInGameMemberships")
     * @var Team
     */
    protected $team;
}