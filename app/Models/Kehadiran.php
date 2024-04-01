<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kehadiran extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

    public function jam_masuk()
    {
        return $this->hasOne(JamMasuk::class);
    }

    public function jam_keluar()
    {
        return $this->hasOne(JamKeluar::class);
    }
}
