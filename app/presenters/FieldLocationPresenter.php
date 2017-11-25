<?php

namespace App\Presenters;

use App\Model\FieldLocation\FieldLocation;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class FieldLocationPresenter
 * @package App\Presenters
 */
class FieldLocationPresenter extends ResourcePresenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionCreate()
    {
        $this->resource->action = 'Create';
    }

    public function actionRead()
    {
        $fieldLocations = $this->doctrine->getRepository(FieldLocation::getClassName())->findAll();
        $this->resource->data = $fieldLocations;
    }

    public function actionUpdate()
    {
        $this->resource->action = 'Update';
    }

    public function actionDelete()
    {
        $this->resource->action = 'Delete';
    }

}