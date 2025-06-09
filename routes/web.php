<?php

use App\Http\Controllers\ProfileController;
use App\Models\Criterias;
use App\Models\ResultCount;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Root');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/data-kriteria', function () {
        $criterias = Criterias::query()->get();

        return Inertia::render('DataKriteria', [
            'criteriasFromDb' => $criterias,
        ]);
    })->name('data-kriteria');

    Route::post('/data-kriteria', function (Request $request) {
        $request->validate([
            'nameCriteriasForDb' => 'string',
            'criteriasForDb' => 'json'
        ]);

        Criterias::query()->create([
            'nama_kriteria' => $request['nameCriteriasForDb'],
            'criterias' => $request['criteriasForDb'],
        ]);
    })->name('data-kriteria');

    Route::get('/data-sub-kriteria', function () {
        return Inertia::render('DataSubKriteria');
    })->name('data-sub-kriteria');

    Route::get('/data-alternatif', function () {
        return Inertia::render('DataAlternatif');
    })->name('data-alternatif');

    Route::get('/data-penilaian', function () {
        return Inertia::render('DataPenilaian');
    })->name('data-penilaian');

    Route::get('/data-perhitungan', function () {
        $hasilHitungFromDb = ResultCount::query()->get();

        return Inertia::render('DataPerhitungan', [
            'hasilHitungFromDb' => $hasilHitungFromDb
        ]);
    })->name('data-perhitungan');

    Route::post('/data-perhitungan', function (Request $request) {
        $request->validate([
            'nama_hasil_hitung' => 'string',
            'data' => 'json',
            'calculation' => 'json',
        ]);

        ResultCount::query()->create([
            'nama_hasil_hitung' => $request['nama_hasil_hitung'],
            'data' => $request['data'],
            'calculation' => $request['calculation'],
        ]);
    })->name('data-perhitungan');

    Route::get('/data-hasil-akhir', function () {
        return Inertia::render('DataHasilAkhir');
    })->name('data-hasil-akhir');

    Route::get('/data-user', function () {
        $users = User::all(['name', 'email', 'created_at', 'updated_at']);

        return Inertia::render('DataUser', ['users' => $users]);
    })->name('data-user');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile-edit');
    Route::patch('/profile-update', [ProfileController::class, 'update'])->name('profile-update');
});

require __DIR__ . '/auth.php';
