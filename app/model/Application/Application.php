<?php

namespace App\Model\Application;

use App\Model\BaseEntity;
use App\Model\FieldInApplication\FieldInApplication;
use App\Model\FieldLocationInApplication\FieldLocationInApplication;
use App\Model\Team\Team;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Application extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Team\Team", inversedBy="applications")
     * @var Team
     */
    protected $team;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\FieldLocationInApplication\FieldLocationInApplication", mappedBy="application")
     * @var ArrayCollection|FieldLocationInApplication[]
     */
    protected $fieldLocationMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\FieldInApplication\FieldInApplication", mappedBy="application")
     * @var ArrayCollection|FieldInApplication[]
     */
    protected $fieldMemberships;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Application\ApplicationPlayDay", mappedBy="application")
     * @var ArrayCollection|ApplicationPlayDay[]
     */
    protected $applicationPlayDays;

    /**
     * @ORM\Column(type="date")
     * @var string
     */
    protected $created;
}