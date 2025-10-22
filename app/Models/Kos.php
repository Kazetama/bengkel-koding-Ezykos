<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kos extends Model
{
    use HasFactory;

    protected $table = 'kos';

    // Kolom yang bisa diisi massal
    protected $fillable = [
        'user_id',
        'nama',
        'gambar',
        'harga',
        'alamat',
        'deskripsi',
        'tipe_kamar',
        'jumlah_kamar',
        'kamar_tersedia',
        'fasilitas',
        'fasilitas_tambahan',
        'kontak',
        'latitude',
        'longitude',
        'rating',
        'status',
    ];

    // Relasi ke owner/user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Mutator: format harga agar selalu rapi
    public function getFormattedHargaAttribute()
    {
        return number_format($this->harga, 0, ',', '.');
    }

    // Scope untuk kos yang tersedia
    public function scopeTersedia($query)
    {
        return $query->where('status', 'tersedia')->where('kamar_tersedia', '>', 0);
    }

    // Scope berdasarkan tipe kamar
    public function scopeTipeKamar($query, $tipe)
    {
        return $query->where('tipe_kamar', $tipe);
    }

    // Accessor untuk lokasi lengkap
    public function getLokasiAttribute()
    {
        return $this->latitude && $this->longitude
            ? $this->latitude . ', ' . $this->longitude
            : null;
    }
}
