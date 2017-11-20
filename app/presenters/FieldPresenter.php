<?php

namespace App\Presenters;

use App\Model\Field\Field;
use App\Model\Field\FieldFactory;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class FieldPresenter
 * @package App\Presenters
 */
class FieldPresenter extends ResourcePresenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionCreate()
    {
        $fieldFactory = new FieldFactory();
        $field = $fieldFactory->createFromArray($this->getInput()->getData());

        $this->doctrine->persist($field);
        $this->doctrine->flush();

        $this->resource->data = $field;
    }

    public function actionRead()
    {
        $fields = $this->doctrine->getRepository(Field::getClassName())->findAll();
        $this->resource->data = $fields;
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