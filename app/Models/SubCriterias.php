<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCriterias extends Model
{
    protected $table = 'sub_kriteria';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];
}
