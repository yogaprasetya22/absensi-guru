<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Jurusan;
use App\Models\Kehadiran;
use App\Models\Kelas;
use App\Models\Matpel;
use App\Models\Role;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        //
        $roles = [
            [
                'name_role' => 'admin',
            ],
            [
                'name_role' => 'guru',
            ],
            [
                'name_role' => 'siswa',
            ],
            // [
            //     'name_role' => 'gh',
            // ],
        ];

        // create data roles
        Role::insert($roles);


        // create kehadiran
        $kehadiran = [
            [
                'kehadiran' => 'Hadir',
            ],
            [
                'kehadiran' => 'Izin',
            ],
            [
                'kehadiran' => 'Sakit',
            ],
            [
                'kehadiran' => 'Terlambat',
            ],
            [
                'kehadiran' => 'Alpa',
            ],
        ];

        // create data kehadiran
        Kehadiran::insert($kehadiran);

        // create kelas 
        $kelas = [
            [
                'kelas' => 'X',
            ],
            [
                'kelas' => 'XI',
            ],
            [
                'kelas' => 'XII',
            ],
        ];

        // create data kelas
        Kelas::insert($kelas);

        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '1',
            'created_at' => now(),
        ]);

        $kurikulum = User::create([
            'name' => 'kurikulum',
            'email' => 'kurikulum@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '2',
            'created_at' => now(),
        ]);

        $kurikulum->kurikulum()->create([
            'uuid'  => str()->uuid(),
            'jk' => 'L',
            'telp' => Factory::create('id_ID')->phoneNumber,
            'alamat' => Factory::create('id_ID')->address,
            'created_at' => now(),
        ]);

        $guru_per_kelas = 4; // Jumlah guru per kelas
        $number_per_kelas = []; // Array untuk melacak nomor urut per kelas
        $index = 0;

        foreach ($kelas as $key => $value) {
            for ($i = 1; $i <= $guru_per_kelas; $i++) {
                $index++;
                // Random id matpel dari keseluruhan matpel
                $kelas_id = ($key % count($kelas)) + 1; // Kalkulasi kelas_id
                $jk = (rand(0, 1) == 0) ? 'L' : 'P';

                // Mengecek jika kelas_id sudah memiliki nomor urut
                if (!isset($number_per_kelas[$kelas_id])) {
                    $number_per_kelas[$kelas_id] = 1; // Inisialisasi nomor urut jika belum ada
                }

                $guru_number = sprintf("%03d", $number_per_kelas[$kelas_id]); // Menggunakan nomor urut untuk guru
                $number_per_kelas[$kelas_id]++; // Menambah nomor urut untuk kelas berikutnya

                $guru_data = User::create([
                    'name' => 'guru' . sprintf("%02d",  $index),
                    'email' => 'guru' . sprintf("%02d",  $index) . '@gmail.com',
                    'password' => bcrypt('asdasdasd'),
                    'role_id' => '3',
                    'created_at' => now(),
                ]);

                $guru_data->guru()->create([
                    'uuid'  => str()->uuid(),
                    'kelas_id' => (int)$kelas_id,
                    'nuptk' => sprintf("%02d", $kelas_id) . '2020' . sprintf("%03d", $guru_number),
                    'jk' =>  $jk,
                    'telp' => Factory::create('id_ID')->phoneNumber,
                    'alamat' => Factory::create('id_ID')->address,
                    'created_at' => now(),
                ]);
            }
        }




        // $siswa_per_kelas = 25; // Jumlah siswa per kelas
        // $kelas_id_counter = 1; // Awal counter kelas_id

        // // Generate data siswa untuk setiap kelas
        // foreach ($kelas as $key => $kelas_item) {
        //     $siswa_counter = 0; // Reset counter siswa per kelas

        //     for ($i = 1; $i <= $siswa_per_kelas; $i++) {
        //         $jk = (rand(0, 1) == 0) ? 'L' : 'P';

        //         $siswa_number = sprintf("%03d", (($key * $siswa_per_kelas) + $i));
        //         $id_kelas_nisn = sprintf("%02d", $kelas_id_counter);

        //         $email = 'siswa' . $siswa_number . '_kelas' . $kelas_id_counter . '@gmail.com';

        //         // Cek apakah alamat email sudah digunakan sebelumnya
        //         $is_duplicate = User::where('email', $email)->exists();

        //         // Jika duplikat, tambahkan nomor siswa ke alamat email
        //         if ($is_duplicate) {
        //             $email = 'siswa' . $siswa_number . '_kelas' . ($kelas_id_counter + 1) . '@gmail.com';
        //         }

        //         $siswa_data = User::create([
        //             'name' => 'siswa' . $siswa_number,
        //             'email' => 'siswa' . $siswa_number . '@gmail.com',
        //             'password' => bcrypt('asdasdasd'),
        //             'role_id' => '3',
        //             'created_at' => now(),
        //         ]);

        //         $siswa_data->siswa()->create([
        //             'uuid'  => str()->uuid(),
        //             'kelas_id' => $kelas_id_counter,
        //             'nisn' => $id_kelas_nisn . '2024' . $siswa_number,
        //             'jk' =>  $jk,
        //             'telp' => Factory::create('id_ID')->phoneNumber,
        //             'created_at' => now(),
        //         ]);

        //         // Periksa apakah sudah mencapai siswa ke-15, jika ya, tambahkan counter kelas_id
        //         if (++$siswa_counter % count($kelas) === 0) {
        //             if ($kelas_id_counter < 15) {
        //                 $kelas_id_counter++;
        //             } else {
        //                 $kelas_id_counter = 1;
        //             }
        //         }
        //     }
        // }

        // create presensi siswa
        $presensi_siswa = [];
    }
}
