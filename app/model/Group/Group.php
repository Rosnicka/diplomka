<?php

namespace App\Model\Group;

use App\Model\BaseEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Group extends BaseEntity
{
    /**
     * @ORM\Column(type="string", length=1)
     * @var string
     */
    protected $letter;
}