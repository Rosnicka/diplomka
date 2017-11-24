<?php

namespace App\Model\Competition;

use App\Model\BaseEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Competition extends BaseEntity
{
    /**
     * @ORM\OneToMany(targetEntity="App\Model\League\League", mappedBy="competition")
     * @var League
     */
    protected $leagues;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $name;

    /**
     * @ORM\Column(type="date")
     * @var string
     */
    protected $startDate;

    /**
     * @ORM\Column(type="date")
     * @var string
     */
    protected $endDate;
}