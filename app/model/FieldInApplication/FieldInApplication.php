<?php

namespace App\Model\FieldInApplication;

use App\Model\Application\Application;
use App\Model\BaseEntity;
use App\Model\Field\Field;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class FieldInApplication extends BaseEntity
{
    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Field\Field", inversedBy="applicationMemberships")
     * @var Field
     */
    protected $field;

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Application\Application", inversedBy="fieldMemberships")
     * @var Application
     */
    protected $application;
}