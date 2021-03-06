<?php

namespace App\Model\Player;

use App\Model\BaseEntity;
use App\Model\Game\GameEvent;
use App\Model\PlayerInGame\PlayerInGame;
use App\Model\Team\Team;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;

/**
 * @ORM\Entity
 * @ORM\Table(uniqueConstraints={@UniqueConstraint(name="birthNumber", columns={"birth_number"})})
 */
class Player extends BaseEntity
{
    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $firstName;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $lastName;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $birthNumber;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $number;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Team\Team", inversedBy="players")
     * @var Team
     */
    protected $team;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\PlayerInGame\PlayerInGame", mappedBy="player")
     * @var PlayerInGame
     */
    protected $gameMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Game\GameEvent", mappedBy="player")
     * @var ArrayCollection|GameEvent[]
     */
    protected $gameEvents;

}