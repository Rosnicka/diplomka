<?php

namespace App\Model\TeamInGroup;

use App\Model\BaseEntity;
use App\Model\Group\Group;
use App\Model\Team\Team;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class TeamInGroup extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Team\Team", inversedBy="groupMemberships")
     * @var Team
     */
    protected $team;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Group\Group", inversedBy="teamMemberships")
     * @var Group
     */
    protected $group;
}