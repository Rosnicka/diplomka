<?php

namespace App\Model\TeamInGame;

use App\Model\BaseEntity;
use App\Model\Game\Game;
use App\Model\Team\Team;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class TeamInGame extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Team\Team", inversedBy="gameMemberships",fetch="EAGER")
     * @var Team
     */
    protected $team;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Game\Game", inversedBy="teamMemberships", fetch="EAGER")
     * @var Game
     */
    protected $game;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $relationship;

    /**
     * @ORM\Column(type="boolean")
     * @var bool
     */
    protected $rosterFilled;
}