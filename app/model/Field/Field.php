<?php

namespace App\Model\Field;

use App\Model\BaseEntity;
use App\Model\FieldInApplication\FieldInApplication;
use App\Model\FieldLocation\FieldLocation;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Field extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\FieldLocation\FieldLocation", inversedBy="fields")
     * @var FieldLocation
     */
    protected $fieldLocation;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\FieldInApplication\FieldInApplication", mappedBy="field")
     * @var ArrayCollection|FieldInApplication[]
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

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $address;
}