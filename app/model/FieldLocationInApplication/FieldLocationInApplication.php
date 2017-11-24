<?php

namespace App\Model\FieldLocationInApplication;

use App\Model\Application\Application;
use App\Model\BaseEntity;
use App\Model\FieldLocation\FieldLocation;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class FieldLocationInApplication extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\FieldLocation\FieldLocation", inversedBy="applicationMemberships")
     * @var FieldLocation
     */
    protected $fieldLocation;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Application\Application", inversedBy="fieldLocationMemberships")
     * @var Application
     */
    protected $application;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $rank;
}