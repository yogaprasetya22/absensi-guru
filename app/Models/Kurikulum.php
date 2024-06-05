<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kurikulum extends Model
{
    use HasFactory;

    protected $primaryKey = 'uuid'; // Tentukan 'uuid' sebagai primary key

    protected $keyType = 'string'; // Tentukan tipe data primary key sebagai string (UUID)

    public $incrementing = false; // Tandai bahwa primary key tidak bersifat inkremental

    protected $fillable = [
        'uuid',
        'user_id',
        'jk',
        'telp',
        'alamat',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
