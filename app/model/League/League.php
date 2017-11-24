<?php

namespace App\Model\League;

use App\Model\BaseEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class League extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Competition\Competition", inversedBy="leagues")
     * @var Competition
     */
    protected $competition;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Group\Group", mappedBy="league")
     * @var Group
     */
    protected $groups;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $level;
}