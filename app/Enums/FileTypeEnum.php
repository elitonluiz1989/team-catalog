<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static Text()
 * @method static static Image()
 */
final class FileTypeEnum extends Enum
{
    const TEXT =   0;
    const IMAGE =   1;
}
