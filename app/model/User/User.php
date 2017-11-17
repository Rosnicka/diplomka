<?php

namespace App\Model\User;

use App\Model\BaseEntity;
use App\Model\Team\Team;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;

/**
 * @ORM\Entity
 * @ORM\Table(uniqueConstraints={@UniqueConstraint(name="email", columns={"email"})})
 */
class User extends BaseEntity
{
    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $email;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $password;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $firstName;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $lastName;

    /**
     * @ORM\OneToMany(targetEntity="App\Model\Team\Team", mappedBy="administrator")
     * @var Team
     */
    protected $team;
}