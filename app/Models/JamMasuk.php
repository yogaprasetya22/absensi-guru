<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JamMasuk extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;

    public function presensi_guru()
    {
        return $this->hasOne(PresensiGuru::class);
    }

    public function kehadiran()
    {
        return $this->belongsTo(Kehadiran::class);
    }
}
