<?php

namespace App\Presenters;

use App\Model\User\User;
use App\Security\AppAuthenticator;
use Doctrine\ORM\EntityManager;
use \Drahak\Restful\Application\UI\ResourcePresenter;
use Nette\Security\AuthenticationException;
use Nette\Security\Passwords;

class AuthPresenter extends ResourcePresenter
{
    /** @var EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionLogin()
    {
        $data = $this->getInput()->getData();
        $user = $this->getUser();

        $authenticator = new AppAuthenticator($this->doctrine);
        $user->setAuthenticator($authenticator);

        try {
            $user->login($data['username'], $data['password']);

            $this->resource->user = $user->getIdentity()->getData();

        } catch (AuthenticationException $e) {
            $this->resource->user = false;
        }
    }

    public function actionLogged()
    {
        $user = $this->getUser();
        if ($user->isLoggedIn()) {
            /** @var User $user */
            $user = $this->doctrine->getRepository(User::getClassName())->find($user->getId());
            if ($user !== null) {
                $userData = $user->toArray(true);
                unset($userData['password']);
                $this->resource->user = $userData;
            } else {
                $this->resource->user = false;
            }
        } else {
            $this->resource->user = false;
        }
    }

    public function actionLogout()
    {
        $user = $this->getUser();
        $user->logout(true);
        $this->resource->action = true;
    }
}