<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Criterias extends Model
{
    protected $table = 'kriteria';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];
}
