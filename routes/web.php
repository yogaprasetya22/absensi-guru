<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\User\AdminController;
use App\Http\Controllers\User\BkalController;
use App\Http\Controllers\User\WarekController;
use App\Http\Controllers\User\KaprodiController;
use App\Http\Controllers\User\DosenPaController;
use App\Http\Controllers\User\MahasiswaController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TableUserController;
use App\Http\Controllers\User\Client;
use App\Http\Controllers\user\GuruController;
use App\Http\Controllers\user\KurikulumController;
use App\Http\Controllers\user\SiswaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::get('/fail404', function () {
    return Inertia::render('404', [
        'title' => '404',
    ]);
})->name('fail404');


Route::prefix('/')->middleware(['auth', 'role:3', 'verified'])->group(function () {
    Route::get('/', [GuruController::class, 'index'])->name('guru');
    Route::get('/absensi', [GuruController::class, 'absensi'])->name('guru.absensi');
    Route::get('/history-absensi', [GuruController::class, 'history_absensi'])->name('guru.history_absensi');

    // absensi
    Route::post('/absensi/jam_masuk', [AbsensiController::class, 'jam_masuk'])->name('absensi.jam_masuk');
    Route::post('/absensi/jam_keluar', [AbsensiController::class, 'jam_keluar'])->name('absensi.jam_keluar');
});

Route::prefix('/kurikulum')->middleware(['auth', 'role:2', 'verified'])->group(function () {
    Route::get('/', [KurikulumController::class, 'index'])->name('kurikulum');
    Route::get('/absensi-guru', [KurikulumController::class, 'absensi_guru'])->name('kurikulum.absensi_guru');
    Route::get('/absensi-guru/{detail}', [KurikulumController::class, 'detail_absensi_guru'])->name('kurikulum.detail_absensi_guru');
    Route::get('/laporan-absensi', [KurikulumController::class, 'laporan_absensi'])->name('kurikulum.laporan_absensi');
    Route::get('/laporan-absensi/cetak-laporan', [KurikulumController::class, 'cetak_laporan_semester'])->name('kurikulum.cetak_laporan_semester');
});

Route::prefix('admin')->middleware(['auth', 'role:1', 'verified'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    Route::get('/kurikulum', [AdminController::class, 'kelola_kurikulum'])->name('admin.kurikulum');
    Route::get('/guru', [AdminController::class, 'kelola_guru'])->name('admin.guru');

    Route::post('/guru/store', [GuruController::class, 'store'])->name('guru.store');
    Route::post('/guru/update', [GuruController::class, 'update'])->name('guru.update');
    Route::delete('/guru/destroy', [GuruController::class, 'destroy'])->name('guru.destroy');

    Route::post('/kurikulum/store', [KurikulumController::class, 'store'])->name('kurikulum.store');
    Route::post('/kurikulum/update', [KurikulumController::class, 'update'])->name('kurikulum.update');
    Route::delete('/kurikulum/destroy', [KurikulumController::class, 'destroy'])->name('kurikulum.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
