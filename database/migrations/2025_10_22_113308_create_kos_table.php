<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kos', function (Blueprint $table) {
            $table->id();

            // Relasi ke user/owner
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            // Info dasar kos
            $table->string('nama');
            $table->string('gambar')->nullable();
            $table->decimal('harga', 12, 2);
            $table->string('alamat')->nullable();
            $table->text('deskripsi')->nullable();

            // Info tambahan
            $table->enum('tipe_kamar', ['single', 'double', 'suite'])->default('single');
            $table->integer('jumlah_kamar')->default(1);
            $table->integer('kamar_tersedia')->default(1);
            $table->text('fasilitas')->nullable();
            $table->text('fasilitas_tambahan')->nullable();
            $table->string('kontak')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->float('rating', 2, 1)->default(0);

            // Status kos
            $table->enum('status', ['tersedia', 'penuh', 'tutup'])->default('tersedia');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kos');
    }
};
