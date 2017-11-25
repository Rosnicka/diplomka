<?php

namespace App\Presenters;

use App\Model\Field\Field;
use App\Model\FieldLocation\FieldLocation;
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
        $this->setupFieldsAndFieldsLocations();
        exit('Setup fields and field locations done.');
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
//    [
//        'code' => 'DOLME',
//        'name' => 'Dolní Měcholupy',
//    ],
//    [
//        'code' => 'EDEN',
//        'name' => 'Hala Slavia',
//    ],
//    [
//        'code' => 'GENJA',
//        'name' => 'ZŠ Generála Janouška',
//    ],
//    [
//        'code' => 'HÁJE 1,2',
//        'name' => 'Háje',
//    ],
//
//    [
//        'code' => 'KBELY ',
//        'name' => 'Spartak Kbely',
//    ],
//    [
//        'code' => 'KLAU 1, 2',
//        'name' => 'Klausova',
//    ],
//    [
//        'code' => 'KORAB',
//        'name' => 'Koráb',
//    ],

//    [
//        'code' => 'SANC 1,2,3,4',
//        'name' => 'Na Šancích',
//    ],

//    [
//        'code' => 'STRE',
//        'name' => 'Střešovice Tatran',
//    ],
//
//
//    [
//        'code' => 'ZARUB',
//        'name' => 'Zárubova',
//    ],
//],
