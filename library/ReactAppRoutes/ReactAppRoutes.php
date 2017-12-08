<?php

namespace Library\ReactAppRoutes;

class ReactAppRoutes
{
    const HOMEPAGE = '/';
    const LOGIN = '/prihlaseni';
    const REGISTER = '/registrace';

    const MY_TEAM_HOME = '/muj-tym';
    const PLAYERS = '/hraci';
    const PLAYER_DETAIL = '/hraci/[<id>]';
    const TEAMS = '/tymy';
    const GAMES = '/zapasy';
    const GAME_DETAIL = '/zapasy/[<id>]';

    public static function getRoutes()
    {
        return [
            self::HOMEPAGE,
            self::LOGIN,
            self::REGISTER,
            self::PLAYERS,
            self::PLAYER_DETAIL,
            self::TEAMS,
            self::GAMES,
            self::GAME_DETAIL,
            self::MY_TEAM_HOME,
        ];
    }
}