<?php

namespace App\Presenters;

use App\Model\Group\Group;
use App\Model\Team\Team;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class GroupPresenter
 * @package App\Presenters
 */
class GroupPresenter extends ResourcePresenter
{
    /** @var EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionReadResults()
    {
        $groupId = $this->getParameter('id');

        $group = $this->doctrine->getRepository(Group::getClassName())->findAll();
        die();
        $this->resource->data = $group;
    }
}