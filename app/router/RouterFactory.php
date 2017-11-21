<?php

namespace App;

use Drahak\Restful\Application\IResourceRouter;
use Drahak\Restful\Application\Routes\ResourceRoute;
use Library\ReactAppRoutes\ReactAppRoutes;
use Nette;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;
use Drahak\Restful\Application\Routes\CrudRoute;

class RouterFactory
{
    use Nette\StaticClass;

    /**
     * @return Nette\Application\IRouter
     */
    public static function createRouter()
    {
        $router = new RouteList;
        $router[] = new ResourceRoute('api/v1/users/login', [
            'presenter' => 'Auth',
            'action' => [
                IResourceRouter::POST => 'login',
            ],
        ], IResourceRouter::POST);
        $router[] = new CrudRoute('api/v1/players', 'Player');
        $router[] = new CrudRoute('api/v1/teams', 'Team');
        $router[] = new CrudRoute('api/v1/fields', 'Field');

        foreach (ReactAppRoutes::getRoutes() as $mask) {
            $router[] = new Route($mask, ['presenter' => 'Homepage', 'action' => 'default']);
        }

        return $router;
    }
}
