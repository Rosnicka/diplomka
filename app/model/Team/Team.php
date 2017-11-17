<?php

namespace App\Model\Team;

use App\Model\BaseEntity;
use App\Model\Player\Player;
use App\Model\TeamInGame\TeamInGame;
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
     * @ORM\ManyToOne(targetEntity="App\Model\User\User", inversedBy="team")
     * @var User
     */
    protected $administrator;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Player\Player", mappedBy="team")
     * @var ArrayCollection|Player[]
     */
    protected $players;
}