<?php

namespace App;

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
		$router[] = new CrudRoute('api/v1/players', 'Player');
		$router[] = new CrudRoute('api/v1/teams', 'Team');
		$router[] = new CrudRoute('api/v1/fields', 'Field');
		$router[] = new Route('/', [
		    'presenter' => 'Homepage',
            'action' => 'default'
        ]);
		return $router;
	}
}
