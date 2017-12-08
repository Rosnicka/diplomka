<?php

namespace App\Presenters;

use App\Model\Player\Player;
use App\Model\Player\PlayerFactory;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * Class PlayerPresenter
 * @package App\Presenters
 */
class PlayerPresenter extends ResourcePresenter
{
    /** @var  EntityManager $doctrine
     * @inject
     */
    public $doctrine;

    public function actionCreate()
    {
        $playerFactory = new PlayerFactory($this->doctrine);
        $player = $playerFactory->createFromArray($this->getInput()->getData());

        $this->doctrine->persist($player);
        $this->doctrine->flush();

        $this->resource->data = $player;
    }

    /**
     * @GET <module>/player
     */
    public function actionRead()
    {
        $id = $this->getParameter('id');

        if ($id !== null) {
            $player = $this->doctrine->getRepository(Player::getClassName())->find($id);
            $this->resource->data = $player;
        } else {
            $players = $this->doctrine->getRepository(Player::getClassName())->findAll();
            $this->resource->data = $players;
        }
    }

    public function actionUpdate()
    {
        $id = $this->getParameter('id');

        if ($id !== null) {
            $this->resource->data = false;
        }

        /** @var Player $player */
        $player = $this->doctrine->getRepository(Player::getClassName())->find($id);
        foreach ($this->getInput()->getData() as $key => $col) {
            $player->{$key} = $col;
        }
        $this->doctrine->persist($player);
        $this->doctrine->flush();

        $this->resource->data = $player;

    }

    public function actionDelete()
    {
        $id = $this->getParameter('id');

        if ($id !== null) {
            $this->resource->data = false;
        }

        /** @var Player $player */
        $player = $this->doctrine->getRepository(Player::getClassName())->find($id);
        $this->doctrine->remove($player);
        $this->doctrine->flush();

        $this->resource->data = true;
    }

}