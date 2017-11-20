<?php

namespace App\Model\Player;

use App\Model\Team\Team;
use Doctrine\ORM\EntityManager;

class PlayerFactory
{
    /** @var EntityManager $entityManager */
    protected $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    public function createFromArray(array $data)
    {
        $player = new Player();
        foreach ($data as $key => $value) {

            if ($key === 'team') {
                $player->{$key} = $this->getTeam($value);
            } else {
                $player->{$key} = $value;
            }
        }

        return $player;
    }

    /**
     * @param $id
     * @return null|Team
     */
    protected function getTeam($id)
    {
        return $this->entityManager->getRepository(Team::getClassName())->find($id);
    }
}