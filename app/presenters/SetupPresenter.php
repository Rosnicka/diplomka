<?php

namespace App\Presenters;

use App\Model\Competition\Competition;
use App\Model\Field\Field;
use App\Model\FieldLocation\FieldLocation;
use App\Model\Game\Game;
use App\Model\Group\Group;
use App\Model\League\League;
use App\Model\Team\Team;
use App\Model\TeamInGame\TeamInGame;
use App\Model\TeamInGroup\TeamInGroup;
use Doctrine\ORM\EntityManager;
use Nette;

class SetupPresenter extends Nette\Application\UI\Presenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionDefault()
    {
        //$this->setupFieldsAndFieldsLocations();
        //$this->setupCompetition();
        //$this->setupTeams();
        $this->setupGames();
        exit('Setup fields and field locations done.');
    }

    protected function setupGames()
    {
        $datetime = new \DateTime('18:30');
        $fields = $this->doctrine->getRepository(Field::getClassName())->findAll();
        $groups = $this->doctrine->getRepository(Group::getClassName())->findAll();

        //universal referee
        $universalTeam = $this->doctrine->getRepository(Team::getClassName())->findOneBy([]);

        foreach ($groups as $group) {
            $teams = [];
            $teamsInArray = [];
            foreach ($group->teamMemberships as $teamMembership) {
                $teams[] = $teamMembership->team->id;
                $teamsInArray[$teamMembership->team->id] = $teamMembership->team;
            }
            $rounds = \Scheduler::schedule($teams);
            foreach ($rounds as $roundKey => $games) {
                $datetime = $datetime->modify('+1 week');

                foreach ($games as $gameKey => $game) {
                    if ($game['home'] === false || $game['host'] === false) {
                        continue;
                    }

                    $newGame = new Game();
                    $newGame->setField($fields[array_rand($fields)]);
                    $newGame->setRound($roundKey);
                    $newGame->setDatetime($datetime);
                    $newGame->setState(Game::GAME_STATE_FILLING_ROSTER);
                    $newGame->setGroup($group);
                    $this->doctrine->persist($newGame);

                    $newTeamInGameHome = new TeamInGame();
                    $newTeamInGameHome->setGame($newGame);
                    $newTeamInGameHome->setRelationship(TeamInGame::RELATIONSHIP_HOME);
                    $newTeamInGameHome->setTeam($teamsInArray[$game['home']]);

                    $newTeamInGameHost = new TeamInGame();
                    $newTeamInGameHost->setGame($newGame);
                    $newTeamInGameHost->setRelationship(TeamInGame::RELATIONSHIP_HOST);
                    $newTeamInGameHost->setTeam($teamsInArray[$game['host']]);

                    $newTeamInGameReferee = new TeamInGame();
                    $newTeamInGameReferee->setGame($newGame);
                    $newTeamInGameReferee->setRelationship(TeamInGame::RELATIONSHIP_REFEREE);
                    $newTeamInGameReferee->setTeam($universalTeam);

                    $this->doctrine->persist($newTeamInGameHome);
                    $this->doctrine->persist($newTeamInGameHost);
                    $this->doctrine->persist($newTeamInGameReferee);
                }
            }
        }
        $this->doctrine->flush();
    }

    protected function setupTeams()
    {
        $teams = [
            'England United FC',
            'PFC Kodymka B',
            'Medvědi B',
            'Senioři Praha A',
            'Ústavan 01 KK',
            'Yakuza',
            'Vysmátí zajíci B',
            'Digi Prague FC',
            'Bröndby codein IF',
            'Jacobs',
            'Junior Motol',
            'Planners Prague FC B',
            'Primitives Prague FC',
            'Inter Letná',
            'SportHES',
            'Prague City FC',
            'Nounejm',
            'Divočáci',
            'Dynamit Vršovice',
            'Jedna noha netleská',
            'Rudý teror',
            'Suchá dáseň AC',
            'Ya Basta! A',
            'Hustý FC',
            'Proradost FK',
            'Senioři Praha B',
            'Gangbeng',
            'Blesk VK B',
            'Horno Porno',
            'Airconquest F.F.C.',
            'Tvar VD',
            'Lemplíci FC',
            'Canary FC',
        ];
        $league = $this->doctrine->getRepository(League::getClassName())->findOneBy([
            'level' => 8,
        ]);

        $x = 0;
        foreach ($league->groups as $group) {
            for ($i = 0; $i < 5; $i++) {
                if (!isset($teams[$x * 5 + $i])) {
                    break;
                }
                $team = new Team();
                $team->setName($teams[$x * 5 + $i]);
                $this->doctrine->persist($team);

                $teamGroupMembership = new TeamInGroup();
                $teamGroupMembership->setTeam($team);
                $teamGroupMembership->setGroup($group);
                $this->doctrine->persist($teamGroupMembership);
            }
            $x++;
        }
        $this->doctrine->flush();
    }

    protected function setupCompetition()
    {
        $competition = new Competition();
        $competition->setName('JARO 2018');
        $competition->setStartDate(new \DateTime());
        $competition->setEndDate(new \DateTime('2018-05-30'));

        $this->doctrine->persist($competition);

        foreach ($this->getLeaguesWithGroups() as $leagueLevel => $groups) {
            $league = new League();
            $league->setLevel($leagueLevel);
            $league->setCompetition($competition);
            $this->doctrine->persist($league);

            foreach ($groups as $groupLetter) {
                $group = new Group();
                $group->setLetter($groupLetter);
                $group->setLeague($league);
                $this->doctrine->persist($group);
            }
        }
        $this->doctrine->flush();
    }

    protected function getLeaguesWithGroups()
    {
        return [
            1 => ['A'],
            2 => ['A', 'B'],
            3 => ['A', 'B', 'C', 'D'],
            4 => ['A', 'B', 'C', 'D', 'E', 'F'],
            5 => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
            6 => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
            7 => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
            8 => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
        ];
    }

    protected function setupFieldsAndFieldsLocations()
    {
        foreach ($this->getFieldsAndFieldsLocationsData() as $fieldLocationData) {
            $fieldLocation = new FieldLocation();
            $fieldLocation->name = $fieldLocationData['name'];
            $fieldLocation->code = $fieldLocationData['code'];

            $this->doctrine->persist($fieldLocation);

            foreach ($fieldLocationData['fields'] as $fieldData) {
                $field = new Field();
                $field->name = $fieldData['name'];
                $field->code = $fieldData['code'];
                $field->fieldLocation = $fieldLocation;
                $this->doctrine->persist($field);
            }
        }

        $this->doctrine->flush();
    }

    protected function getFieldsAndFieldsLocationsData()
    {
        return
            [
                [
                    'name' => 'Praha 3',
                    'code' => 'PRAHA_3',
                    'fields' => [
                        [
                            'code' => 'PRA',
                            'name' => 'Pražačka',
                        ],
                    ],
                ],
                [
                    'name' => 'Praha 4',
                    'code' => 'PRAHA_4',
                    'fields' => [
                        [
                            'code' => 'DEKAN  ',
                            'name' => 'Děkanka',
                        ],
                        [
                            'code' => 'HRAB',
                            'name' => 'Hrabákova',
                        ],
                        [
                            'code' => 'MIKU',
                            'name' => 'Mikulova',
                        ],
                        [
                            'code' => 'TEMPO',
                            'name' => 'Tempo Praha FC',
                        ],
                    ],

                ],
                [
                    'name' => 'Praha 5',
                    'code' => 'PRAHA_5',
                    'fields' => [
                        [
                            'code' => 'CESMI',
                            'name' => 'Čechie Smíchov',
                        ],
                        [
                            'code' => 'MOTO',
                            'name' => 'Motorlet',
                        ],
                        [
                            'code' => 'SLIVE',
                            'name' => 'Slivenec AFK',
                        ],
                        [
                            'code' => 'STOD',
                            'name' => 'Stodůlky',
                        ],
                    ],
                ],
                [
                    'name' => 'Praha 6',
                    'code' => 'PRAHA_6',
                    'fields' => [
                        [
                            'code' => 'ARIT',
                            'name' => 'Aritma',
                        ],
                        [
                            'code' => 'BIHOR',
                            'name' => 'Bílá Hora',
                        ],
                        [
                            'code' => 'HANSP',
                            'name' => 'Hanspaulka',
                        ],
                        [
                            'code' => 'PRKOP',
                            'name' => 'Přední Kopanina FC',
                        ],
                    ],
                ],
                [
                    'name' => 'Praha 8',
                    'code' => 'PRAHA_8',
                    'fields' => [
                        [
                            'code' => 'DABLI',
                            'name' => 'Ďáblice SK',
                        ],
                        [
                            'code' => 'METE',
                            'name' => 'Meteor 8',
                        ],
                    ],
                ],
                [
                    'name' => 'Praha 9',
                    'code' => 'PRAHA_9',
                    'fields' => [
                        [
                            'code' => 'BECH',
                            'name' => 'Běchovice 2',
                        ],
                        [
                            'code' => 'LITVI',
                            'name' => 'Litvínovská',
                        ],
                        [
                            'code' => 'NOVOB',
                            'name' => 'Novoborská',
                        ],
                        [
                            'code' => 'SCBEC',
                            'name' => 'Sportovní centrum Běchovice',
                        ],
                        [
                            'code' => 'ZAK',
                            'name' => 'Zákostelní',
                        ],
                    ],
                ],
                [
                    'name' => 'Praha 10',
                    'code' => 'PRAHA_10',
                    'fields' => [
                        [
                            'code' => 'HOSTI',
                            'name' => 'Hostivař',
                        ],
                        [
                            'code' => 'MALES',
                            'name' => 'AFK Malešice',
                        ],
                        [
                            'code' => 'STER',
                            'name' => 'Štěrboholy',
                        ],
                        [
                            'code' => 'ZABEH',
                            'name' => 'Záběhlice',
                        ],
                    ],
                ],
            ];
    }
}
