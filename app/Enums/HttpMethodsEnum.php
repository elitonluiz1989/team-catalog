<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @property static string GET
 * @property static string POST
 * @property static string PUT
 * @property static string DELETE
 */
final class HttpMethodsEnum extends Enum
{
    const GET = 'get';
    const POST = 'post';
    const PUT = 'put';
    const DELETE = 'delete';
}
