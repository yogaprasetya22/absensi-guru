<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\PresensiGuru;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GuruController extends Controller
{
    public function __construct()
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = auth()->user()->id;
        $absen_masuk = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran', 'status_kehadiran'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->where('tanggal', now()->format('Y-m-d'))
            ->first();
        $data_presensi = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran', 'status_kehadiran'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->get();
        return Inertia::render('guru/Index', [
            'title' => 'Dashboard guru',
            'absen_masuk' => $absen_masuk,
            'data_presensi' => $data_presensi,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function absensi()
    {
        $id = auth()->user()->id;
        $data_presensi = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->where('tanggal', now()->format('Y-m-d'))
            ->first();
        return Inertia::render('guru/Absensi', [
            'title' => 'Absensi guru',
            'data_presensi' => $data_presensi,
        ]);
    }

    public function history_absensi()
    {
        $id = auth()->user()->id;
        $data_presensi = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran', 'status_kehadiran'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->get();
        return Inertia::render('guru/HistoryAbsensi', [
            'title' => 'History Absensi guru',
            'data_presensi' => $data_presensi,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 
        $request->validate([
            'nama' => 'required',
            'email' => 'required',
            'password' => 'required',
            'jk' => 'required',
            'alamat' => 'required',
            'no_hp' => 'required',
        ]);

        $user = User::create([
            'name' => $request->nama,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => '3',
            'created_at' => now(),
        ]);

        $user->guru()->create([
            'uuid'  => str()->uuid(),
            'nuptk' => '2024' . sprintf("%02d",  Guru::with(['user'])->latest()->first()->user_id + 1),
            'jk' => $request->jk,
            'alamat' => $request->alamat,
            'telp' => $request->no_hp,
            'created_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Data guru berhasil ditambahkan');
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
    public function update(Request $request)
    {
        if ($request->password && $request->password_confirmation && $request->password !== $request->password_confirmation) {
            return sleep(2);
        }
        $user = User::find($request->id);
        $user->update([
            'name' => $request->nama,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => '3',
            'updated_at' => now(),
        ]);

        $user->guru()->update([
            'jk' => $request->jk,
            'alamat' => $request->alamat,
            'telp' => $request->no_hp,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Data guru berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $user = User::find($request->id);
        $user->delete();
        return redirect()->back()->with('success', 'Data guru berhasil dihapus');
    }
}
