<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Kurikulum;
use App\Models\Kelas;
use App\Models\PresensiGuru;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KurikulumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('kurikulum/Index', [
            'title' => 'Dashboard kurikulum'
        ]);
    }

    public function absensi_guru()
    {
        $data_presensi = User::with(['guru.kelas', 'guru.user'])
            ->where('role_id', 3)
            ->get();
        return Inertia::render('kurikulum/Absensi', [
            'title' => 'Absensi guru',
            'data_presensi' => $data_presensi,
        ]);
    }

    public function detail_absensi_guru($detail, Request $request)
    {

        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
            ->where('guru_uuid', $detail)
            ->get();
        $user_guru = User::with(['guru.kelas', 'guru.user'])->whereHas('guru', function ($query) use ($detail) {
            $query->where('uuid', $detail);
        })->first();
        // Mendapatkan tanggal awal bulan
        $startDate = Carbon::create($request->tahun, $request->bulan, 1)->startOfMonth();

        // Mendapatkan tanggal akhir bulan
        $endDate = Carbon::create($request->tahun, $request->bulan, 1)->endOfMonth();

        // Array untuk menyimpan semua tanggal dalam bulan
        $datesMonth = [];

        // Loop untuk menambahkan setiap tanggal ke dalam array
        $currentDate = $startDate;
        while ($currentDate->lte($endDate)) {
            $datesMonth[] = $currentDate->toDateString(); // Mengonversi tanggal ke dalam format string
            $currentDate->addDay(); // Menambahkan satu hari ke tanggal saat ini
        }

        // Array untuk menyimpan data presensi dan tanggal
        $presensiData = [];

        foreach ($data_presensi as $presensi) {
            $tanggalPresensi = $presensi->tanggal;

            // Cek apakah tanggal presensi ada dalam array $datesMonth
            if (in_array($tanggalPresensi, $datesMonth)) {
                // Simpan data presensi dan tanggalnya dalam array
                $presensiData[] = [
                    'tanggal' => $tanggalPresensi,
                    'data_presensi' => $presensi,
                ];
            }
        }

        // Loop untuk menambahkan tanggal yang tidak memiliki data presensi
        foreach ($datesMonth as $tanggal) {
            if (!in_array($tanggal, array_column($presensiData, 'tanggal'))) {
                // Jika tidak ada data pada tanggal tersebut, tambahkan tanggalnya saja
                $presensiData[] = [
                    'tanggal' => $tanggal,
                    'data_presensi' => [
                        'jam_keluar' => [
                            'jam_keluar' => null,
                            'kehadiran' => [
                                'kehadiran' => 'Alpa',
                            ]
                        ], // Atau kosongkan jika tidak ada data jam keluar
                        'jam_masuk' => [
                            'jam_masuk' => null,
                            'kehadiran' => [
                                'kehadiran' => 'Alpa',
                            ]
                        ], // Atau kosongkan jika tidak ada data jam masuk
                        'guru' => [
                            'user' => [
                                'name' => $user_guru->name,
                            ]
                        ]
                    ], // Atau kosongkan jika tidak ada data presensi
                ];
            }
        }

        return Inertia::render('kurikulum/DetailAbsensi', [
            'title' => 'History Absensi guru',
            'data_presensi' => $data_presensi,
            'presensiData' => $presensiData,
            'uuid' => $detail,
            'bulan' => $request->bulan,
            'tahun' => $request->tahun,
        ]);
    }

    public function laporan_absensi()
    {
        $data_presensi = User::with(['guru.kelas', 'guru.user'])
            ->where('role_id', 3)
            ->get();
        return Inertia::render('kurikulum/LaporanAbsensi', [
            'title' => 'Laporan Absensi guru',
            'data_presensi' => $data_presensi,
        ]);
    }

    public function
    detail_laporan_absensi($detail, Request $request)
    {

        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
            ->where('guru_uuid', $detail)
            ->get();
        $user_guru = User::with(['guru.kelas', 'guru.user'])->whereHas('guru', function ($query) use ($detail) {
            $query->where('uuid', $detail);
        })->first();
        // Mendapatkan tanggal awal bulan
        $startDate = Carbon::create($request->tahun, $request->bulan, 1)->startOfMonth();

        // Mendapatkan tanggal akhir bulan
        $endDate = Carbon::create($request->tahun, $request->bulan, 1)->endOfMonth();

        // Array untuk menyimpan semua tanggal dalam bulan
        $datesMonth = [];

        // Loop untuk menambahkan setiap tanggal ke dalam array
        $currentDate = $startDate;
        while ($currentDate->lte($endDate)) {
            $datesMonth[] = $currentDate->toDateString(); // Mengonversi tanggal ke dalam format string
            $currentDate->addDay(); // Menambahkan satu hari ke tanggal saat ini
        }

        // Array untuk menyimpan data presensi dan tanggal
        $presensiData = [];

        foreach ($data_presensi as $presensi) {
            $tanggalPresensi = $presensi->tanggal;

            // Cek apakah tanggal presensi ada dalam array $datesMonth
            if (in_array($tanggalPresensi, $datesMonth)) {
                // Simpan data presensi dan tanggalnya dalam array
                $presensiData[] = [
                    'tanggal' => $tanggalPresensi,
                    'data_presensi' => $presensi,
                ];
            }
        }

        // Loop untuk menambahkan tanggal yang tidak memiliki data presensi
        foreach ($datesMonth as $tanggal) {
            if (!in_array($tanggal, array_column($presensiData, 'tanggal'))) {
                // Jika tidak ada data pada tanggal tersebut, tambahkan tanggalnya saja
                $presensiData[] = [
                    'tanggal' => $tanggal,
                    'data_presensi' => [
                        'jam_keluar' => [
                            'jam_keluar' => null,
                            'kehadiran' => [
                                'kehadiran' => 'Alpa',
                            ]
                        ], // Atau kosongkan jika tidak ada data jam keluar
                        'jam_masuk' => [
                            'jam_masuk' => null,
                            'kehadiran' => [
                                'kehadiran' => 'Alpa',
                            ]
                        ], // Atau kosongkan jika tidak ada data jam masuk
                        'guru' => [
                            'user' => [
                                'name' => $user_guru->name,
                            ]
                        ]
                    ], // Atau kosongkan jika tidak ada data presensi
                ];
            }
        }

        return Inertia::render('kurikulum/DetailLaporanAbsensi', [
            'title' => 'History Absensi guru',
            'data_presensi' => $data_presensi,
            'presensiData' => $presensiData,
            'uuid' => $detail,
            'bulan' => $request->bulan,
            'tahun' => $request->tahun,
        ]);
    }

    public function cetak_laporan_semester(Request $request)
    {

        // Mendapatkan bulan awal dan akhir berdasarkan jenis semester
        if ($request->semester == 'gasal') {
            $bulan_awal = 1; // Semester ganjil dimulai pada bulan Januari
            $bulan_akhir = 6; // Semester ganjil berakhir pada bulan Juni
        } else {
            $bulan_awal = 7; // Semester genap dimulai pada bulan Juli
            $bulan_akhir = 12; // Semester genap berakhir pada bulan Desember
        }

        $name_guru = User::with(['guru'])->whereHas('guru', function ($query) use ($request) {
            $query->where('uuid', $request->uuid);
        })->first();

        $data_presensi = PresensiGuru::with(['guru.kelas', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
            ->whereHas('guru.user', function ($query) use ($request) {
                $query->where('uuid', $request->uuid);
            })
            ->where(function ($query) use ($bulan_awal, $bulan_akhir) {
                $query->where(function ($query) use ($bulan_awal, $bulan_akhir) {
                    $query->whereMonth('tanggal', '>=', $bulan_awal)
                        ->whereMonth('tanggal', '<=', $bulan_akhir);
                });
            })
            ->get();

        if ($data_presensi->isEmpty()) {
            $data_presensi = [];
        }

        $user_guru = User::with(['guru.kelas', 'guru.user'])->whereHas('guru', function ($query) use ($request) {
            $query->where('uuid', $request->uuid);
        })->first();
        // Mendapatkan tanggal awal bulan
        $startDate = Carbon::create($request->tahun, $request->bulan, 1)->startOfMonth();

        // Mendapatkan tanggal akhir bulan
        $endDate = Carbon::create($request->tahun, $request->bulan, 1)->endOfMonth();

        // Array untuk menyimpan semua tanggal dalam bulan
        $datesMonth = [];

        // Loop untuk menambahkan setiap tanggal ke dalam array
        $currentDate = $startDate;
        while ($currentDate->lte($endDate)) {
            $datesMonth[] = $currentDate->toDateString(); // Mengonversi tanggal ke dalam format string
            $currentDate->addDay(); // Menambahkan satu hari ke tanggal saat ini
        }

        // Array untuk menyimpan data presensi dan tanggal
        $presensiData = [];

        foreach ($data_presensi as $presensi) {
            $tanggalPresensi = $presensi->tanggal;

            // Cek apakah tanggal presensi ada dalam array $datesMonth
            if (in_array($tanggalPresensi, $datesMonth)) {
                // Simpan data presensi dan tanggalnya dalam array
                $presensiData[] = [
                    'tanggal' => $tanggalPresensi,
                    'data_presensi' => $presensi,
                ];
            }
        }

        // Loop untuk menambahkan tanggal yang tidak memiliki data presensi
        foreach ($datesMonth as $tanggal) {
            if (!in_array($tanggal, array_column($presensiData, 'tanggal'))) {
                // Jika tidak ada data pada tanggal tersebut, tambahkan tanggalnya saja
                $presensiData[] = [
                    'tanggal' => $tanggal,
                    'data_presensi' => [
                        'jam_keluar' => [
                            'jam_keluar' => null,
                            'kehadiran' => [
                                'kehadiran' => 'Alpa',
                            ]
                        ], // Atau kosongkan jika tidak ada data jam keluar
                        'guru' => [
                            'user' => [
                                'name' => $user_guru->name,
                            ]
                        ]
                    ], // Atau kosongkan jika tidak ada data presensi
                ];
            }
        }

        return Inertia::render('kurikulum/CetakLaporanSemester', [
            'title' => 'Cetak Laporan Semester ' . $name_guru->guru->user->name,
            'data_presensi' => $data_presensi,
            'presensiData' => $presensiData,
            'nama_guru' => $name_guru->guru->user->name,
        ]);
    }

    // public function absensi()
    // {
    //     $id = auth()->user()->id;
    //     $jadwal = Jadwal::with(['kelas', 'kurikulum.user'])->whereHas('kurikulum', function ($query) use ($id) {
    //         $query->where('user_id', $id);
    //     })->get();
    //     return Inertia::render('kurikulum/Absen/Index', [
    //         'title' => 'Absensi guru',
    //         'jadwal' => $jadwal,
    //     ]);
    // }

    // public function detail_absensi($uuid)
    // {
    //     $jadwal = Jadwal::with(['kelas', 'kurikulum.user'])->where('uuid', $uuid)->first();
    //     if (!$jadwal) {
    //         $guru = [];
    //     }
    //     $data_guru = PresensiGuru::with(['guru.kelas', 'guru.user', 'kehadiran', 'jadwal'])->where('jadwal_uuid', $uuid)->get();
    //     if ($data_guru->isEmpty() && $jadwal) {
    //         $guru = User::with(['guru.kelas'])->where('role_id', 3)->whereHas('guru', function ($query) use ($jadwal) {
    //             $query->where('kelas_id', $jadwal->kelas_id);
    //         })->get();
    //         if ($guru->isEmpty()) {
    //             $guru = [];
    //         }
    //     } else {
    //         $guru = $data_guru;
    //     }


    //     return Inertia::render('kurikulum/Absen/Absensi', [
    //         'title' => 'Absensi Detail guru',
    //         'guru' => $guru,
    //         'jadwal_uuid' => $uuid,
    //     ]);
    // }

    // public function absensi_store(Request $request)
    // {
    //     $request->validate([
    //         'guru_id' => 'required',
    //         'jadwal_id' => 'required',
    //         'status' => 'required',
    //     ]);

    //     $absensi = [
    //         'guru_id' => $request->guru_id,
    //         'jadwal_id' => $request->jadwal_id,
    //         'status' => $request->status,
    //         'created_at' => now(),
    //     ];

    //     return response()->json($absensi);
    // }


    //    function jadwal
    // public function jadwal()
    // {
    //     $id = auth()->user()->id;
    //     $uuid = Kurikulum::where('user_id', $id)->first();
    //     $jadwal = Jadwal::with(['kelas', 'kurikulum.user'])->get();
    //     $kelas = Kelas::all();
    //     return Inertia::render('kurikulum/Jadwal', [
    //         'title' => 'Jadwal Pelajaran',
    //         'jadwal' => $jadwal,
    //         'kelas' => $kelas,
    //         'uuid' => $uuid
    //     ]);
    // }


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

        $request->validate([
            'nuptk' => 'required',
            'jk' => 'required',
            'telp' => 'required',
            'alamat' => 'required',
            'kelas_id' => 'required'
        ]);


        // $user = User::create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => bcrypt('asdasdasd'),
        //     'role_id' => 2
        // ]);

        $user = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('asdasdasd'),
            'role_id' => 2,
            // 
            'uuid'  => str()->uuid(),
            'kelas_id' => $request->kelas_id,
            'nuptk' => $request->nuptk,
            'jk' => $request->jk,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
            'created_at' => now(),
        ];

        return response()->json($user);
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
