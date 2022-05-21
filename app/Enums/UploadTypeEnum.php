<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static Files()
 * @method static static Images()
 */
final class UploadTypeEnum extends Enum
{
    const FILES =   0;
    const IMAGES =   1;
}
