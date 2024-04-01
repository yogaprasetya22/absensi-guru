<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\PresensiGuru;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GuruController extends Controller
{
    protected $kelas_guru;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->kelas_guru = User::with(['guru.kelas'])->where('role_id', 3)->where('id', Auth::user()->id)->first();

            return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = auth()->user()->id;
        $absen_masuk = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->where('tanggal', now()->format('Y-m-d'))
            ->first();
        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
            ->whereHas('guru.user', function ($query) use ($id) {
                $query->where('id', $id);
            })
            ->get();
        return Inertia::render('guru/Index', [
            'title' => 'Dashboard guru',
            'kelas_guru' => $this->kelas_guru,
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
        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
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
        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
