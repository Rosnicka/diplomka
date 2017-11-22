<?php

namespace App\Security;

use App\Model\User\User;
use Doctrine\ORM\EntityManager;
use Nette\Security\AuthenticationException;
use Nette\Security\Identity;
use Nette\Security\Passwords;

class AppAuthenticator implements \Nette\Security\IAuthenticator
{
    /** @var  EntityManager $entityManager */
    public $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    function authenticate(array $credentials)
    {
        list($username, $password) = $credentials;
        /* @var User $row */
        $row = $this->entityManager->getRepository(User::getClassName())->findOneBy(['email =' => $username]);

        if (!$row) {
            throw new AuthenticationException('User not found.');
        }

        if (!Passwords::verify($password, $row->password)) {
            throw new AuthenticationException('Invalid password.');
        }

        $userData = $row->toArray();
        unset($userData['password']);

        return new Identity($row->id, $row->roles, $userData);
    }

}