<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alternatifs extends Model
{
    protected $table = 'alternatifs';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];
}
