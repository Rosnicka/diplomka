<?php

namespace App\Model\Field;

class FieldFactory
{
    public function createFromArray(array $data)
    {
        $field = new Field();
        foreach ($data as $key => $value) {
            $field->{$key} = $value;
        }

        return $field;
    }
}