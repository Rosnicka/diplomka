<?php

namespace App\Presenters;

use App\Model\Team\Team;
use App\Model\User\User;
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
        $data = $this->getInput()->getData();
        $team = new Team();
        $team->name = $data['name'];

        $this->doctrine->persist($team);
        $this->doctrine->flush();

        $administrator = $this->doctrine->getRepository(User::getClassName())->find($data['administrator']);
        if ($administrator === null) {
            $this->resource->data = false;
            $this->sendResource();
        }
        $administrator->team = $team;
        $this->doctrine->persist($administrator);
        $this->doctrine->flush();

        $this->resource->data = $team;
    }

    public function actionRead()
    {
        $id = $this->getParameter('id');

        if ($id !== null) {
            $team = $this->doctrine->getRepository(Team::getClassName())->find($id);
            $this->resource->data = $team;
        } else {
            $teams = $this->doctrine->getRepository(Team::getClassName())->findAll();
            $this->resource->data = $teams;
        }
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