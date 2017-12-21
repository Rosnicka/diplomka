<?php

namespace App\Presenters;

use App\Model\Application\ApplicationFactory;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class ApplicationPresenter
 * @package App\Presenters
 */
class ApplicationPresenter extends ResourcePresenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionCreate()
    {
        $applicationFactory = new ApplicationFactory($this->doctrine);
        $application = $applicationFactory->createApplication($this->getInput()->getData());

        $this->resource->data = $application;
    }
}