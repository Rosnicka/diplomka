<?php

namespace App\Model\Group;

use App\Model\BaseEntity;
use App\Model\Game\Game;
use App\Model\League\League;
use App\Model\TeamInGroup\TeamInGroup;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="`group`")
 */
class Group extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\League\League", inversedBy="groups")
     * @var League
     */
    protected $league;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\TeamInGroup\TeamInGroup", mappedBy="group")
     * @var ArrayCollection|TeamInGroup[]
     */
    protected $teamMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Game\Game", mappedBy="group")
     * @var ArrayCollection|Game[]
     */
    protected $gameMemberships;

    /**
     * @ORM\Column(type="string", length=1)
     * @var string
     */
    protected $letter;
}