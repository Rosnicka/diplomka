<?php

namespace App\Presenters;

use App\Model\Player\Player;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class PlayerPresenter
 * @package App\Presenters
 */
class PlayerPresenter extends ResourcePresenter
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
        $players = $this->doctrine->getRepository(Player::getClassName())->findAll();
        $this->resource->data = $players;
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