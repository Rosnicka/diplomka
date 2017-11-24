<?php

namespace App\Model\Group;

use App\Model\BaseEntity;
use App\Model\League\League;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
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
     * @ORM\Column(type="string", length=1)
     * @var string
     */
    protected $letter;
}