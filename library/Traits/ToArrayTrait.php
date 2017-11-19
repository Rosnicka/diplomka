<?php
/**
 * Created by PhpStorm.
 * User: dfx413
 * Date: 09.11.17
 * Time: 0:19
 */

namespace dfx413\Utils\Traits;


use Nette\Reflection\Property;
use Nette\Utils\Strings;

trait ToArrayTrait
{
	public function toArray($exportNullValues = false, array $exportProperties = null)
	{
		$exportArray = [];

		foreach (get_object_vars($this) as $key => $value) {
		    $reflection = new Property($this, $key);
		    $annotations = $reflection->getAnnotations();

		    $propertyType = null;
		    foreach (array_keys($annotations) as $annotationKey) {
		        if (Strings::contains($annotationKey, 'ToMany')) {
		            $propertyType = 'ToMany';
		            break;
                } elseif (Strings::contains($annotationKey, 'ToOne')) {
                    $propertyType = 'ToOne';
		            break;
                }
            }

            if ($propertyType === null) {
                $exportArray[$key] = $value;
            } elseif ($propertyType === 'ToOne') {
                $exportArray[$key] = $value !== null ? $value->__get('id') : null;
            }
		}

		if ($exportNullValues === false) {
			$exportArray = array_filter($exportArray, function($element) {return $element !== null;});
		}

		if (is_array($exportProperties)) {
			$exportProperties = array_combine($exportProperties, $exportProperties);
			$exportArray = array_intersect_key($exportArray, $exportProperties);
		}

		return $exportArray;
	}

	public function toJson($exportNullValues = false, array $exportProperties = null)
	{
		return json_encode($this->toArray($exportNullValues, $exportProperties),JSON_UNESCAPED_UNICODE|JSON_PRESERVE_ZERO_FRACTION|JSON_NUMERIC_CHECK);
	}

}