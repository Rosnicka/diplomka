<?php

namespace App\Model\Team;

use App\Model\Application\Application;
use App\Model\BaseEntity;
use App\Model\Player\Player;
use App\Model\PlayerInGame\PlayerInGame;
use App\Model\TeamInGame\TeamInGame;
use App\Model\TeamInGroup\TeamInGroup;
use App\Model\User\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Team extends BaseEntity
{
    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\TeamInGame\TeamInGame", mappedBy="team")
     * @var ArrayCollection|TeamInGame[]
     */
    protected $gameMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\TeamInGroup\TeamInGroup", mappedBy="team")
     * @var ArrayCollection|TeamInGroup[]
     */
    protected $groupMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\PlayerInGame\PlayerInGame", mappedBy="team")
     * @var ArrayCollection|PlayerInGame[]
     */
    protected $playersInGameMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Application\Application", mappedBy="team")
     * @var ArrayCollection|Application[]
     */
    protected $applications;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\User\User", mappedBy="team")
     * @var User
     */
    protected $administrators;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Player\Player", mappedBy="team")
     * @var ArrayCollection|Player[]
     */
    protected $players;
}