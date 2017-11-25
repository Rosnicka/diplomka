<?php

namespace App\Model\Application;

use App\Model\BaseEntity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class ApplicationPlayDay extends BaseEntity
{
    const CODE_MONDAY = 'monday';
    const CODE_TUESDAY = 'tuesday';
    const CODE_WEDNESDAY = 'wednesday';
    const CODE_THURSDAY = 'thursday';
    const CODE_FRIDAY = 'friday';
    const CODE_SATURDAY_AM = 'saturday_am';
    const CODE_SATURDAY_PM = 'saturday_pm';
    const CODE_SUNDAY_AM = 'sunday_am';
    const CODE_SUNDAY_PM = 'sunday_pm';

    public static function getDayCodes()
    {
        return [
            self::CODE_MONDAY,
            self::CODE_TUESDAY,
            self::CODE_WEDNESDAY,
            self::CODE_THURSDAY,
            self::CODE_FRIDAY,
            self::CODE_SATURDAY_AM,
            self::CODE_SATURDAY_PM,
            self::CODE_SUNDAY_AM,
            self::CODE_SUNDAY_PM,
        ];
    }

    /**
     * @ORM\ManyToOne(targetEntity="App\Model\Application\Application", inversedBy="applicationPlayDays")
     * @var Application
     */
    protected $application;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $code;

    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected $rank;
}