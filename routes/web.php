<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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
        return Inertia::render('DataKriteria');
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
        return Inertia::render('DataPerhitungan');
    })->name('data-perhitungan');

    Route::get('/data-hasil-akhir', function () {
        return Inertia::render('DataHasilAkhir');
    })->name('data-hasil-akhir');

    Route::get('/data-user', function () {
        return Inertia::render('DataUser');
    })->name('data-user');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile-edit');
    Route::patch('/profile-update', [ProfileController::class, 'update'])->name('profile-update');
});

require __DIR__ . '/auth.php';
