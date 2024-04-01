<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

    public function kurikulum()
    {
        return $this->hasOne(Kurikulum::class);
    }

    public function guru()
    {
        return $this->hasOne(Guru::class);
    }

    public function presensi_guru()
    {
        return $this->hasMany(PresensiGuru::class);
    }

}
