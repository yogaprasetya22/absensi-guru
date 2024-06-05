<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\JamKeluar;
use App\Models\JamMasuk;
use App\Models\PresensiGuru;
use App\Models\user;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DhasboardController extends Controller
{

    public function index($uuid)
    {
        function getRandomNumber()
        {
            // Definisikan array dengan probabilitas yang diinginkan
            $numbers = array_merge(
                array_fill(0, 80, 1),  // 80% untuk angka 1
                array_fill(0, 5, 2),   // 5% untuk angka 2
                array_fill(0, 5, 3),   // 5% untuk angka 3
                array_fill(0, 5, 4),   // 5% untuk angka 4
                array_fill(0, 5, 5)    // 5% untuk angka 5
            );

            // Acak array
            shuffle($numbers);

            // Ambil satu angka acak dari array
            return $numbers[array_rand($numbers)];
        }
        function getRandomNumberKeluar()
        {
            // Definisikan array dengan probabilitas yang diinginkan
            $numbers = array_merge(
                array_fill(0, 80, 1),  // 80% untuk angka 1
                array_fill(0, 5, 2),   // 5% untuk angka 2
            );

            // Acak array
            shuffle($numbers);

            // Ambil satu angka acak dari array
            return $numbers[array_rand($numbers)];
        }

        $guru = Guru::with(['user'])->where('uuid', $uuid)->first();
        $data = [];
        // Iterasi melalui bulan-bulan dari Januari hingga Desember
        for ($bulan = 1; $bulan <= 12; $bulan++) {
            // Mendapatkan jumlah hari dalam bulan yang sedang diproses
            $jumlahHari = Carbon::create(null, $bulan, 1)->daysInMonth;

            // Iterasi melalui setiap hari dalam bulan yang sedang diproses
            for ($hari = 1; $hari <= $jumlahHari; $hari++) {
                // Membuat tanggal dalam format Y-m-d
                $tanggal = Carbon::create(null, $bulan, $hari)->format('Y-m-d');

                // Cek apakah presensi guru dengan user dan tanggal yang sama sudah ada
                $existingPresensi = PresensiGuru::where('guru_uuid', $guru->uuid)
                    ->where('tanggal', $tanggal)
                    ->exists();

                // Jika presensi sudah ada, lanjut ke tanggal berikutnya
                if ($existingPresensi) {
                    return response()->json(['message' => 'Presensi guru sudah ada untuk tahun ini'], 400);
                }

                // Membuat data jam masuk dan keluar secara acak
                $jamMasuk = Carbon::createFromTime(rand(6, 8), rand(0, 15), rand(0, 26));
                $jamKeluar = Carbon::createFromTime(rand(13, 15), rand(0, 15), rand(0, 26));

                $kehadiranMasukId = getRandomNumber();

                $kehadiranKeluarId = getRandomNumberKeluar();
                // Membuat entri baru untuk jam masuk
                $data_jam_masuk = JamMasuk::create([
                    'jam_masuk' => $jamMasuk->format('H:i:s'),
                    'longtitude' => (float) str_replace(',', '.', "106,6985583"),
                    'latitude' => (float) str_replace(',', '.', "-6,3159484"),
                    'kehadiran_id' => $kehadiranMasukId, // Menggunakan kehadiran_id sesuai dengan kondisi
                    'image_masuk' => "storage/selfi.png",
                ]);

                // Membuat entri baru untuk jam keluar
                $data_jam_keluar = JamKeluar::create([
                    'jam_keluar' => $jamKeluar->format('H:i:s'),
                    'longtitude' => (float) str_replace(',', '.', "106,6985583"),
                    'latitude' => (float) str_replace(',', '.', "-6,3159484"),
                    'kehadiran_id' => $kehadiranKeluarId, // Menggunakan kehadiran_id sesuai dengan kondisi
                    'image_keluar' => "storage/selfi.png",
                ]);

                // Membuat entri baru untuk presensi guru
                PresensiGuru::create([
                    'uuid' => str()->uuid(),
                    'guru_uuid' => $guru->uuid,
                    'tanggal' => $tanggal,
                    'status_kehadiran_id' => $kehadiranKeluarId == 2 ? $kehadiranKeluarId : $kehadiranMasukId,
                    'jam_masuk_id' => $data_jam_masuk->id,
                    'jam_keluar_id' => $data_jam_keluar->id,
                ]);
                $data[] = [
                    'tanggal' => $tanggal,
                    'jam_masuk' => $jamMasuk->format('H:i:s'),
                    'jam_keluar' => $jamKeluar->format('H:i:s'),
                    'kehadiran_masuk_id' => $kehadiranMasukId,
                    'kehadiran_keluar_id' => $kehadiranKeluarId,
                ];
            }
        }

        return response()->json([
            'count' => count($data),
            'data' => $data,
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        // data guru terakhir first
        $data = Guru::with(['user'])->latest()->first()->user_id;
        return response()->json([
            'count' => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
