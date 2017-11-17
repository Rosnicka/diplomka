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
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $level;
}