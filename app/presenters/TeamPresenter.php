<?php

namespace App\Presenters;

use App\Model\Team\Team;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class TeamPresenter
 * @package App\Presenters
 */
class TeamPresenter extends ResourcePresenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionCreate()
    {
        $data = $this->input->getData();
        var_dump($data);
        $this->resource->action = 'Create';
    }

    public function actionRead()
    {
        $teams = $this->doctrine->getRepository(Team::getClassName())->findAll();
        $this->resource->data = $teams;
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