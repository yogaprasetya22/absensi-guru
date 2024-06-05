<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PresensiGuru extends Model
{
    use HasFactory;

    protected $primaryKey = 'uuid'; // Tentukan 'uuid' sebagai primary key

    protected $keyType = 'string'; // Tentukan tipe data primary key sebagai string (UUID)

    public $incrementing = false; // Tandai bahwa primary key tidak bersifat inkremental

    protected $fillable = [
        'uuid', 'guru_uuid', 'tanggal', 'jam_masuk_id', 'jam_keluar_id', 'status_kehadiran_id'
    ];

    public function kurikulum()
    {
        return $this->belongsTo(Kurikulum::class);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }

    public function status_kehadiran(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Kehadiran::class, 'status_kehadiran_id', 'id');
    }

    public function jam_masuk()
    {
        return $this->belongsTo(JamMasuk::class);
    }

    public function jam_keluar()
    {
        return $this->belongsTo(JamKeluar::class);
    }
}
