<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('admin/Admin', [
            'title' => 'Dashboard',
            'data' => $user,
        ]);
    }

    public function kelola_guru()
    {
        $guru = User::with(['guru.kelas'])->where('role_id', 2)->latest()->get();
        return Inertia::render('admin/Guru', [
            'title' => 'Kelola Guru',
            'guru' => $guru,
        ]);
    }

    // public function kelola_siswa()
    // {
    //     $siswa = User::with(['siswa.kelas'])->where('role_id', 3)->latest()->get();
    //     return Inertia::render('admin/Siswa', [
    //         'title' => 'Kelola Siswa',
    //         'siswa' => $siswa,
    //     ]);
    // }

    // public function kelola_jurusan()
    // {
    //     $jurusan = Jurusan::all();
    //     return Inertia::render('admin/Jurusan', [
    //         'title' => 'Kelola Jurusan',
    //         'data' => $jurusan,
    //     ]);
    // }

}
