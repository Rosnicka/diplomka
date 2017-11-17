<?php

namespace App\Model\Game;

use App\Model\BaseEntity;
use App\Model\Field\Field;
use App\Model\PlayerInGame\PlayerInGame;
use App\Model\TeamInGame\TeamInGame;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Game extends BaseEntity
{
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
}