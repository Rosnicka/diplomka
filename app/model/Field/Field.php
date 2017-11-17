<?php

namespace App\Model\Field;

use App\Model\BaseEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Field extends BaseEntity
{
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