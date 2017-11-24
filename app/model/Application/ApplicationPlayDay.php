<?php

namespace App\Model\Application;

use App\Model\BaseEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class ApplicationPlayDay extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Application\Application", inversedBy="applicationPlayDays")
     * @var Application
     */
    protected $application;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $code;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $rank;
}