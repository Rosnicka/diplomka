<?php

namespace App\Presenters;

use Nette;

class HomepagePresenter extends Nette\Application\UI\Presenter
{
    public function startup()
    {
        parent::startup();
        $this->autoCanonicalize = FALSE;
    }

    public function actionDefault()
    {

    }
}
