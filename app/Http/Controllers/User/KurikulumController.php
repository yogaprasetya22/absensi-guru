<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Kurikulum;
use App\Models\PresensiGuru;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class KurikulumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data_user = User::with(['guru', 'guru.user'])
            ->where('role_id', 3)
            ->get();
        if (!$request->semester && !$request->tahun && !$request->uuid) {
            return Redirect::route('kurikulum', ['semester' => 'gasal', 'tahun' => now()->format('Y'), 'uuid' => $data_user[0]->guru->uuid]);
        }

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

        $data_presensi = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran', 'status_kehadiran'])
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

        $user_guru = User::with(['guru', 'guru.user'])->whereHas('guru', function ($query) use ($request) {
            $query->where('uuid', $request->uuid);
        })->first();
        // Mendapatkan tanggal awal bulan
        $startDate = Carbon::create($request->tahun, $bulan_awal, 1)->startOfMonth();

        // Mendapatkan tanggal akhir bulan
        $endDate = Carbon::create($request->tahun, $bulan_akhir, 1)->endOfMonth();

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
                                'name' => $user_guru?->name,
                            ]
                        ]
                    ], // Atau kosongkan jika tidak ada data presensi
                ];
            }
        }

        return Inertia::render('kurikulum/Index', [
            'title' => 'Dashboard kurikulum',
            'data' => $data_user,
            'presensiData' => $presensiData,
            'nama_guru' => $name_guru->guru->user->name,
            'tahun' => $request->tahun,
            'semester' => $request->semester,
            'uuid_guru' => $name_guru->guru->uuid,
        ]);
    }

    public function absensi_guru()
    {
        $data_presensi = User::with(['guru', 'guru.user'])
            ->where('role_id', 3)
            ->get();
        return Inertia::render('kurikulum/Absensi', [
            'title' => 'Absensi guru',
            'data_presensi' => $data_presensi,
        ]);
    }

    public function detail_absensi_guru($detail, Request $request)
    {

        $data_presensi = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran', 'status_kehadiran'])
            ->where('guru_uuid', $detail)
            ->get();
        $user_guru = User::with(['guru', 'guru.user'])->whereHas('guru', function ($query) use ($detail) {
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
        $data_presensi = User::with(['guru', 'guru.user'])
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

        $data_presensi = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran'])
            ->where('guru_uuid', $detail)
            ->get();
        $user_guru = User::with(['guru', 'guru.user'])->whereHas('guru', function ($query) use ($detail) {
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

        $data_presensi = PresensiGuru::with(['guru', 'guru.user', 'jam_masuk.kehadiran', 'jam_keluar.kehadiran', 'status_kehadiran'])
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

        $user_guru = User::with(['guru', 'guru.user'])->whereHas('guru', function ($query) use ($request) {
            $query->where('uuid', $request->uuid);
        })->first();
        // Mendapatkan tanggal awal bulan
        $startDate = Carbon::create($request->tahun, $bulan_awal, 1)->startOfMonth();

        // Mendapatkan tanggal akhir bulan
        $endDate = Carbon::create($request->tahun, $bulan_akhir, 1)->endOfMonth();

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

        return Inertia::render('kurikulum/CetakLaporanSemester', [
            'title' => 'Cetak Laporan Semester ' . $name_guru->guru->user->name,
            'data_presensi' => $data_presensi,
            'presensiData' => $presensiData,
            'nama_guru' => $name_guru->guru->user->name,
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
            'role_id' => '2',
            'created_at' => now(),
        ]);

        $user->kurikulum()->create([
            'uuid'  => str()->uuid(),
            'jk' => $request->jk,
            'alamat' => $request->alamat,
            'telp' => $request->no_hp,
            'created_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Data kurikulum berhasil ditambahkan');
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
            'role_id' => '2',
            'updated_at' => now(),
        ]);

        $user->kurikulum()->update([
            'jk' => $request->jk,
            'alamat' => $request->alamat,
            'telp' => $request->no_hp,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Data kurikulum berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $user = User::find($request->id);
        $user->delete();
        return redirect()->back()->with('success', 'Data kurikulum berhasil dihapus');
    }
}
