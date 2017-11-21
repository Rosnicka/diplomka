<?php

namespace Library\ReactAppRoutes;

class ReactAppRoutes
{
    const HOMEPAGE = '/';
    const LOGIN = '/prihlaseni';
    const REGISTER = '/registrace';
    const PLAYERS = '/hraci';
    const TEAMS = '/tymy';

    public static function getRoutes()
    {
        return [
            self::HOMEPAGE,
            self::LOGIN,
            self::REGISTER,
            self::PLAYERS,
            self::TEAMS,
        ];
    }
}