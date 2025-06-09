<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResultCount extends Model
{
    protected $table = 'hasil_hitung';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];
}
