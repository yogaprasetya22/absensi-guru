<?php

namespace App\Http\Controllers;

use App\Models\JamKeluar;
use App\Models\JamMasuk;
use App\Models\Kehadiran;
use App\Models\PresensiGuru;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class AbsensiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function jam_masuk(Request $request)
    {
        // Ambil string base64 dari permintaan
        $base64Image = $request->image;

        // Dekode string base64 menjadi data biner
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));

        // Tentukan nama file untuk gambar
        $filename = 'image_' . time() . '.jpg';

        // Simpan data biner ke dalam file menggunakan metode penyimpanan Laravel
        Storage::disk('public')->put($filename, $imageData);

        // Path file yang disimpan di dalam penyimpanan
        $filePath = 'storage/' . $filename;

        $id = $request->id;
        $guru = User::with(['guru.kelas'])->where('role_id', 3)->where('id', $id)->first();
        $kehadiran = Kehadiran::where('kehadiran', $request->status)->first();
        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk', 'jam_keluar'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->where('tanggal', now()->format('Y-m-d'))
            ->get();

        if ($data_presensi) {
            $data_jam_masuk = JamMasuk::create([
                'jam_masuk' => now()->format('H:i:s'),
                'longtitude' => (float) str_replace(',', '.', $request?->location[1]),
                'latitude' => (float) str_replace(',', '.', $request?->location[0]),
                'kehadiran_id' => $kehadiran->id,
                'image_masuk' => $filePath,
            ]);

            PresensiGuru::create([
                'uuid' => str()->uuid(),
                'guru_uuid' => $guru->guru->uuid,
                'kelas_id' => $guru->guru->kelas_id,
                'tanggal' => now()->format('Y-m-d'),
                'jam_masuk_id' => $data_jam_masuk->id,
                'status_kehadiran' => $request->status,
            ]);
        } else {
            return Redirect::route('guru')->with('error', 'Anda Sudah Melakukan Absensi');
        }

        // Redirect back
        return Redirect::route('guru')->with('success', 'Berhasil Melakukan Absensi');
    }

    public function jam_keluar(Request $request)
    {
        // Ambil string base64 dari permintaan
        $base64Image = $request->image;

        // Dekode string base64 menjadi data biner
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));

        // Tentukan nama file untuk gambar
        $filename = 'image_' . time() . '.jpg';

        // Simpan data biner ke dalam file menggunakan metode penyimpanan Laravel
        Storage::disk('public')->put($filename, $imageData);

        // Path file yang disimpan di dalam penyimpanan
        $filePath = 'storage/' . $filename;

        $id = $request->id;
        $guru = User::with(['guru.kelas'])->where('role_id', 3)->where('id', $id)->first();
        $kehadiran = Kehadiran::where('kehadiran', $request->status)->first();
        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk', 'jam_keluar'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->where('tanggal', now()->format('Y-m-d'))
            ->first();


        if ($data_presensi) {
            $data_jam_keluar = JamKeluar::create([
                'jam_keluar' => now()->format('H:i:s'),
                'longtitude' => (float) str_replace(',', '.', $request->location[1]),
                'latitude' => (float) str_replace(',', '.', $request->location[0]),
                'kehadiran_id' => $kehadiran->id,
                'image_keluar' => $filePath,
            ]);

            if ($request->status == 'Izin') {
                PresensiGuru::where('guru_uuid', $guru->guru->uuid)
                    ->where('tanggal', now()->format('Y-m-d'))
                    ->update([
                        'jam_keluar_id' => $data_jam_keluar->id,
                        'status_kehadiran' => $request->status,
                    ]);
            } else {
                PresensiGuru::where('guru_uuid', $guru->guru->uuid)
                    ->where('tanggal', now()->format('Y-m-d'))
                    ->update([
                        'jam_keluar_id' => $data_jam_keluar->id,
                    ]);
            }
        } else {
            return Redirect::route('guru')->with('error', 'Anda Belum Melakukan Absensi Masuk');
        }

        // Redirect guru
        return Redirect::route('guru')->with('success', 'Berhasil Melakukan Absensi');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data_keseluruhan_guru = [];
        foreach ($request->all() as $absensi) {
            $kehadiran = Kehadiran::where('kehadiran', $absensi['status'])->first();
            $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'kehadiran', 'jadwal'])
                ->where('guru_uuid', $absensi['guru_uuid'])
                ->where('jadwal_uuid', $absensi['jadwal_uuid'])
                ->where('kelas_id', $absensi['kelas_id'])
                ->get();

            if ($data_presensi) {
                PresensiGuru::where('guru_uuid', $absensi['guru_uuid'])
                    ->where('jadwal_uuid', $absensi['jadwal_uuid'])
                    ->where('kelas_id', $absensi['kelas_id'])
                    ->where('guru_uuid', $absensi['guru_uuid'])
                    ->delete();

                $data_keseluruhan_guru[] = [
                    'uuid' => str()->uuid(),
                    'guru_uuid' => $absensi['guru_uuid'],
                    'jadwal_uuid' => $absensi['jadwal_uuid'],
                    'kelas_id' => $absensi['kelas_id'],
                    'kehadiran_id' => $kehadiran->id,
                    'tanggal' => now()->format('Y-m-d'),
                    'jam_masuk' => now()->format('H:i:s'),
                ];
            } else {
                $data_keseluruhan_guru[] = [
                    'uuid' => str()->uuid(),
                    'guru_uuid' => $absensi['guru_uuid'],
                    'jadwal_uuid' => $absensi['jadwal_uuid'],
                    'kelas_id' => $absensi['kelas_id'],
                    'kehadiran_id' => $kehadiran->id,
                    'tanggal' => now()->format('Y-m-d'),
                    'jam_masuk' => now()->format('H:i:s'),
                ];
            }
        }
        if ($data_keseluruhan_guru) {
            // return response()->json($data_keseluruhan_guru);
            PresensiGuru::insert($data_keseluruhan_guru);
        }

        // Redirect back
        return Redirect::back()->with('success', 'Berhasil Melakukan Absensi');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        foreach ($request->all() as $absensi) {
            $kehadiran = Kehadiran::where('kehadiran
            ', $absensi['status'])->first();
            PresensiGuru::with(['guru.kelas', 'guru.user', 'kehadiran', 'jadwal'])
                ->where('guru_uuid', $absensi['guru_uuid'])
                ->where('jadwal_uuid', $absensi['jadwal_uuid'])
                ->where('kehadiran_id', '!=', $kehadiran->id)->update(
                    [
                        'kehadiran_id' => $kehadiran->id,
                        'tanggal' => now()->format('Y-m-d'),
                        'jam_masuk' => now()->format('H:i:s'),
                    ]
                );
        }


        // Redirect back
        return Redirect::back()->with('success', 'Berhasil Melakukan Absensi');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
