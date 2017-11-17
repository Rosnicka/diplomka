<?php

namespace App\Model;

use dfx413\Utils\Traits\ToArrayTrait;
use Doctrine\ORM\Mapping as ORM;
use Drahak\Restful\IResource;
use Drahak\Restful\Traversable;
use Kdyby\Doctrine\Entities\MagicAccessors;

/**
 * @ORM\MappedSuperclass()
 */
class BaseEntity implements IResource
{
    use MagicAccessors;

    use ToArrayTrait;

    //use \Kdyby\Doctrine\Entities\Attributes\Identifier; // Using Identifier trait for id column

    public function getData()
    {
        return $this->toArray(true);
    }


    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @var integer
     */
    protected $id;



    /**
     * @return integer
     */
    final public function getId()
    {
        return $this->id;
    }



    public function __clone()
    {
        $this->id = NULL;
    }




}