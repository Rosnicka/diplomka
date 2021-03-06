<?php

class Scheduler
{
    public static function schedule($teams)
    {
        if (count($teams) % 2 === 1) {
            $teams[] = false;
        }
        $teamCount = count($teams);

        $firstTeam = array_shift($teams);
        $rounds = [];
        // kola
        for ($roundNumber = 1; $roundNumber < $teamCount; $roundNumber++) {
            // zapasy
            for ($gameIterator = 0; $gameIterator < $teamCount / 2; $gameIterator++) {
                // První element se drží stále na fixním místě
                if ($gameIterator === 0) {
                    $homeTeam = $firstTeam;
                } else {
                    $homeTeam = $teams[$gameIterator - 1];
                }
                $hostTeam = $teams[$teamCount - $gameIterator - 2];

                $rounds[$roundNumber][$gameIterator + 1]['home'] = $roundNumber % 2 === 0 ? $homeTeam : $hostTeam;
                $rounds[$roundNumber][$gameIterator + 1]['host'] = $roundNumber % 2 === 0 ? $hostTeam : $homeTeam;
            }

            // Posunutí týmů v poli
            $lastElement = array_pop($teams);
            array_unshift($teams, $lastElement);
        }
        return $rounds;
    }
}