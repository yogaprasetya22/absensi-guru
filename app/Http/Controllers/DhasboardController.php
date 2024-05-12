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
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     for ($i = 0; $i < 15; $i++) {

    //         $guru = Guru::with(['user', 'kelas'])->whereHas('user', function ($query) {
    //             $query->where('id', 3);
    //         })->first();

    //         $tanggal = now()->setDay($i)->format('Y-m-d');

    //         // Cek apakah presensi guru dengan user dan tanggal yang sama sudah ada
    //         $existingPresensi = PresensiGuru::with(['guru.user'])
    //             ->where('guru_uuid', $guru->uuid)
    //             ->where('tanggal', $tanggal)
    //             ->exists();

    //         if ($existingPresensi) {
    //             // Jika presensi sudah ada, beri respon bahwa guru sudah melakukan absen
    //             return response()->json(['message' => 'Presensi guru sudah ada untuk tanggal ini'], 400);
    //         }

    //         $data_jam_masuk = JamMasuk::create([
    //             'jam_masuk' => now()->setHour(7)->format('H:i:s'),
    //             'longtitude' =>
    //             (float) str_replace(
    //                 ',',
    //                 '.',
    //                 "106,6985583"
    //             ),
    //             'latitude' => (float) str_replace(',', '.', "-6,3159484"),
    //             'kehadiran_id' => 1,
    //             'image_masuk' => "storage/image_1711908317.jpg",
    //         ]);

    //         $data_jam_keluar = JamKeluar::create([
    //             'jam_keluar' => now()->setHour(16)->format('H:i:s'),
    //             'longtitude' =>
    //             (float) str_replace(
    //                 ',',
    //                 '.',
    //                 "106,6985583"
    //             ),
    //             'latitude' => (float) str_replace(',', '.', "-6,3159484"),
    //             'kehadiran_id' => 1,
    //             'image_keluar' =>
    //             "storage/image_1711908311.jpg",
    //         ]);

    //         PresensiGuru::create([
    //             'uuid' => str()->uuid(),
    //             'guru_uuid' => $guru->uuid,
    //             'kelas_id' => $guru->kelas_id,
    //             'tanggal' => now()->setDay($i)->format('Y-m-d'),
    //             'jam_masuk_id' => $data_jam_masuk->id,
    //             'jam_keluar_id' => $data_jam_keluar->id,
    //         ]);

    //         return response()->json(['message' => 'Presensi guru berhasil'], 200);
    //     }
    // }

    public function index($uuid)
    {
        $guru = Guru::with(['user', 'kelas'])->where('uuid', $uuid)->first();

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
                $jamMasuk = Carbon::createFromTime(rand(7, 9), rand(0, 15), rand(0, 26));
                $jamKeluar = Carbon::createFromTime(rand(15, 17), rand(0, 15), rand(0, 26));

                // Memeriksa apakah jam masuk terlambat
                if ($jamMasuk->greaterThan(Carbon::createFromTime(8, 30))) {
                    // Jika terlambat, atur kehadiran_id menjadi 4 (terlambat)
                    $kehadiranMasukId = 4;
                } else {
                    $kehadiranMasukId = 1; // Jika tidak terlambat, atur kehadiran_id menjadi 1 (hadir tepat waktu)
                }

                // Memeriksa apakah jam keluar lebih awal
                if ($jamKeluar->lessThan(Carbon::createFromTime(16, 30))) {
                    // Jika lebih awal, atur kehadiran_id menjadi 4 (pulang lebih awal)
                    $kehadiranKeluarId = 4;
                } else {
                    $kehadiranKeluarId = 1; // Jika tidak lebih awal, atur kehadiran_id menjadi 1 (pulang tepat waktu)
                }

                // Membuat entri baru untuk jam masuk
                $data_jam_masuk = JamMasuk::create([
                    'jam_masuk' => $jamMasuk->format('H:i:s'),
                    'longtitude' => (float) str_replace(',', '.', "106,6985583"),
                    'latitude' => (float) str_replace(',', '.', "-6,3159484"),
                    'kehadiran_id' => $kehadiranMasukId, // Menggunakan kehadiran_id sesuai dengan kondisi
                    'image_masuk' => "storage/image_1711908317.jpg",
                ]);

                // Membuat entri baru untuk jam keluar
                $data_jam_keluar = JamKeluar::create([
                    'jam_keluar' => $jamKeluar->format('H:i:s'),
                    'longtitude' => (float) str_replace(',', '.', "106,6985583"),
                    'latitude' => (float) str_replace(',', '.', "-6,3159484"),
                    'kehadiran_id' => $kehadiranKeluarId, // Menggunakan kehadiran_id sesuai dengan kondisi
                    'image_keluar' => "storage/image_1711908311.jpg",
                ]);

                // Membuat entri baru untuk presensi guru
                PresensiGuru::create([
                    'uuid' => str()->uuid(),
                    'guru_uuid' => $guru->uuid,
                    'kelas_id' => $guru->kelas_id,
                    'tanggal' => $tanggal,
                    'jam_masuk_id' => $data_jam_masuk->id,
                    'jam_keluar_id' => $data_jam_keluar->id,
                ]);
            }
        }

        return response()->json(['message' => 'Presensi guru berhasil'], 200);
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
    public function show(user $user)
    {
        //
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
