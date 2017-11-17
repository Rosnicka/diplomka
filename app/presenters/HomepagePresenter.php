<?php

namespace App\Presenters;

use Kdyby\Doctrine\EntityManager;
use Nette;


class HomepagePresenter extends Nette\Application\UI\Presenter
{
    /** @var  EntityManager
     * @inject
     */
    public $doctrine;


}
