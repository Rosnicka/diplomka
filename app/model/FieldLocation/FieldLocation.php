<?php

namespace App\Model\FieldLocation;

use App\Model\BaseEntity;
use App\Model\Field\Field;
use App\Model\FieldLocationInApplication\FieldLocationInApplication;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class FieldLocation extends BaseEntity
{
    /**
     * @ORM\OneToMany(targetEntity="App\Model\Field\Field", mappedBy="fieldLocation")
     * @var ArrayCollection|Field[]
     */
    protected $fields;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\FieldLocationInApplication\FieldLocationInApplication", mappedBy="fieldLocation")
     * @var ArrayCollection|FieldLocationInApplication[]
     */
    protected $applicationMemberships;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $name;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $code;
}