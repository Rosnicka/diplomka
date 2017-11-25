<?php

namespace App\Model\Application;

use App\Exceptions\MissingArrayKeyException;
use App\Exceptions\PlayDaysRankSumExceedLimitException;
use App\Model\Field\Field;
use App\Model\FieldInApplication\FieldInApplication;
use App\Model\FieldLocation\FieldLocation;
use App\Model\FieldLocationInApplication\FieldLocationInApplication;
use App\Model\Team\Team;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityNotFoundException;
use Nette\DateTime;
use Nette\InvalidArgumentException;

class ApplicationFactory
{
    const MAX_PLAY_DAY_RANK_SUM = 33;

    /** @var EntityManager $entityManager */
    protected $entityManager;

    public function __construct(EntityManager $doctrine)
    {
        $this->entityManager = $doctrine;
    }

    public function createApplication(array $values)
    {
        $application = new Application();
        $application->team = $this->getTeam($values);
        $application->created = new DateTime();
        $application->applicationPlayDays = $this->createPlayDays($values, $application);
        $application->fieldLocationMemberships = $this->createFieldLocationMemberships($values, $application);
        $application->fieldMemberships = $this->createFieldMemberships($values, $application);

        // PERSIST OBJECTS
        foreach ($application->applicationPlayDays as $day) {
            $this->entityManager->persist($day);
        }

        foreach ($application->fieldLocationMemberships as $fieldLocationMembership) {
            $this->entityManager->persist($fieldLocationMembership);
        }

        foreach ($application->fieldMemberships as $fieldMembership) {
            $this->entityManager->persist($fieldMembership);
        }

        $this->entityManager->persist($application);
        $this->entityManager->flush();

        return $application;
    }

    /**
     * @param array $values
     * @param Application $application
     * @return array
     * @throws EntityNotFoundException
     * @throws MissingArrayKeyException
     */
    protected function createFieldMemberships(array $values, Application $application)
    {
        if (!isset($values['fieldMemberships'])) {
            throw new MissingArrayKeyException();
        }

        $fieldRepository = $this->entityManager->getRepository(Field::getClassName());

        $fieldMemberships = [];
        foreach ($values['fieldMemberships'] as $fieldMembership) {
            if (!isset($fieldMembership['field']) || !isset($fieldMembership['rank'])) {
                throw new MissingArrayKeyException();
            }
            $field = $fieldRepository->find($fieldMembership['field']);
            if ($field === null) {
                throw new EntityNotFoundException();
            }
            $newFieldMembership = new FieldInApplication();
            $newFieldMembership->field = $field;
            $newFieldMembership->application = $application;
            $newFieldMembership->rank = $fieldMembership['rank'];

            $fieldMemberships[] = $newFieldMembership;
        }

        return $fieldMemberships;
    }

    /**
     * @param array $values
     * @param Application $application
     * @return array
     * @throws EntityNotFoundException
     * @throws MissingArrayKeyException
     */
    protected function createFieldLocationMemberships(array $values, Application $application)
    {
        if (!isset($values['fieldLocationMemberships'])) {
            throw new MissingArrayKeyException();
        }

        $fieldLocationRepository = $this->entityManager->getRepository(FieldLocation::getClassName());

        $fieldLocationMemberships = [];
        foreach ($values['fieldLocationMemberships'] as $fieldLocationMembership) {
            if (!isset($fieldLocationMembership['fieldLocation']) || !isset($fieldLocationMembership['rank'])) {
                throw new MissingArrayKeyException();
            }
            $fieldLocation = $fieldLocationRepository->find($fieldLocationMembership['fieldLocation']);
            if ($fieldLocation === null) {
                throw new EntityNotFoundException();
            }
            $newFieldLocationMembership = new FieldLocationInApplication();
            $newFieldLocationMembership->fieldLocation = $fieldLocation;
            $newFieldLocationMembership->application = $application;
            $newFieldLocationMembership->rank = $fieldLocationMembership['rank'];

            $fieldLocationMemberships[] = $newFieldLocationMembership;
        }

        return $fieldLocationMemberships;
    }

    /**
     * @param array $values
     * @param Application $application
     * @return array
     * @throws MissingArrayKeyException
     * @throws PlayDaysRankSumExceedLimitException
     */
    protected function createPlayDays(array $values, Application $application)
    {
        if (!isset($values['playDays'])) {
            throw new MissingArrayKeyException();
        }

        $playDays = [];
        foreach ($values['playDays'] as $playDay) {
            if (!isset($playDay['code']) || !$playDay['rank']) {
                throw new MissingArrayKeyException();
            }

            if (array_key_exists($playDay['code'], ApplicationPlayDay::getDayCodes())) {
                throw new InvalidArgumentException();
            }

            $newPlayDay = new ApplicationPlayDay();
            $newPlayDay->code = $playDay['code'];
            $newPlayDay->rank = $playDay['rank'];
            $newPlayDay->application = $application;
            $playDays[] = $newPlayDay;
        }

        $this->validatePlayDaysRankSumLimit($playDays);

        return $playDays;
    }

    /**
     * @param array $days
     * @return bool
     * @throws PlayDaysRankSumExceedLimitException
     */
    protected function validatePlayDaysRankSumLimit(array $days)
    {
        $rankSum = 0;

        /** @var ApplicationPlayDay $day */
        foreach ($days as $day) {
            $rankSum += $day->rank;
        }

        if ($rankSum > self::MAX_PLAY_DAY_RANK_SUM) {
            throw new PlayDaysRankSumExceedLimitException('Součet hracích dnů přesahuje 33! (aktuálně ' . $rankSum . ')');
        }

        return true;
    }

    /**
     * @param array $values
     * @return null|object
     * @throws EntityNotFoundException
     * @throws MissingArrayKeyException
     */
    protected function getTeam(array $values)
    {
        if (!isset($values['team'])) {
            throw new MissingArrayKeyException();
        }
        $team = $this->entityManager->getRepository(Team::getClassName())->find($values['team']);

        if ($team === null) {
            throw new EntityNotFoundException();
        }

        return $team;
    }
}