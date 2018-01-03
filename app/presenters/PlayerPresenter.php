<?php

namespace App\Presenters;

use App\Model\Player\Player;
use App\Model\Player\PlayerFactory;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManager;
use Drahak\Restful\Application\UI\ResourcePresenter;
use Drahak\Restful\InvalidArgumentException;

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
        try {
            $playerFactory = new PlayerFactory($this->doctrine);
            $player = $playerFactory->createFromArray($this->getInput()->getData());

            $this->doctrine->persist($player);
            $this->doctrine->flush();

            $this->resource->msg = [
                'success' => true,
                'text' => 'Byl založen nový hráč.',
                'data' => $player,
            ];
        } catch (UniqueConstraintViolationException $e) {
            $this->resource->msg = [
                'success' => false,
                'text' => 'Založení nového hráče se nezdařilo. Zadané rodné číslo je již použito u jiného hráče.',];
        } catch (InvalidArgumentException $e) {
            $this->resource->msg = [
                'success' => false,
                'text' => 'Založení nového hráče se nezdařilo. Nebyly zadány potřebné údaje.',
            ];
        } catch (\Exception $e) {
            $this->resource->msg = [
                'success' => false,
                'text' => 'Založení nového hráče se nezdařilo.',
            ];
        }
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
            $this->resource->msg = [
                'success' => false,
                'text' => 'Hráč nebyl nalezen',
            ];
        }

        try {
            /** @var Player $player */
            $player = $this->doctrine->getRepository(Player::getClassName())->find($id);
            foreach ($this->getInput()->getData() as $key => $col) {
                $player->{$key} = $col;
            }
            $this->doctrine->persist($player);
            $this->doctrine->flush();

            $this->resource->msg = [
                'success' => true,
                'text' => 'Hráč byl upraven.',
                'data' => $player,
            ];
        } catch (UniqueConstraintViolationException $e) {
            $this->resource->msg = [
                'success' => false,
                'text' => 'Úprava hráče se nezdařila. Zadané rodné číslo je již použito u jiného hráče.',
            ];
        } catch (InvalidArgumentException $e) {
            $this->resource->msg = [
                'success' => false,
                'text' => 'Úprava hráče se nezdařila. Nebyly zadány potřebné údaje.',
            ];
        } catch (\Exception $e) {
            $this->resource->msg = [
                'success' => false,
                'text' => 'Úprava hráče se nezdařila.',
            ];
        }
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