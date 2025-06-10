<?php

use App\Http\Controllers\ProfileController;
use App\Models\Alternatifs;
use App\Models\Criterias;
use App\Models\ResultCount;
use App\Models\SubCriterias;
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

        Criterias::query()->updateOrCreate(
            [
                'nama_kriteria' => 'criteria_default',
            ],
            [
                'nama_kriteria' => $request['nameCriteriasForDb'],
                'criterias' => $request['criteriasForDb'],
            ]
        );
    })->name('data-kriteria');

    Route::get('/data-sub-kriteria', function () {
        $subCriterias = SubCriterias::query()->get();

        return Inertia::render('DataSubKriteria', [
            'subCriteriasFromDb' => $subCriterias,
        ]);
    })->name('data-sub-kriteria');

    Route::post('/data-sub-kriteria', function (Request $request) {
        $request->validate([
            'nameSubCriteriasForDb' => 'string',
            'subCriteriasForDb' => 'json',
        ]);

        SubCriterias::query()->updateOrCreate(
            [
                'nama_sub_kriteria' => 'sub_criteria_default',
            ],
            [
                'nama_sub_kriteria' => $request['nameSubCriteriasForDb'],
                'sub_criterias' => $request['subCriteriasForDb'],
            ]
        );
    })->name('data-sub-kriteria');

    Route::get('/data-alternatif', function () {
        $alternatifs = Alternatifs::query()->get();

        return Inertia::render('DataAlternatif', [
            'alternatifsFromDb' => $alternatifs,
        ]);
    })->name('data-alternatif');

    Route::post('/data-alternatif', function (Request $request) {
        $request->validate([
            'nameAlternatifsForDb' => 'string',
            'alternatifsForDb' => 'json',
        ]);

        Alternatifs::query()->updateOrCreate(
            [
                'nama_alternatifs' => 'alternatif_default',
            ],
            [
                'nama_alternatifs' => $request['nameAlternatifsForDb'],
                'alternatifs' => $request['alternatifsForDb'],
            ]
        );
    })->name('data-alternatif');

    Route::get('/data-penilaian', function () {
        return Inertia::render('DataPenilaian');
    })->name('data-penilaian');

    Route::get('/data-perhitungan', function () {
        return Inertia::render('DataPerhitungan');
    })->name('data-perhitungan');

    Route::get('/data-hasil-akhir', function () {
        $hasilHitungFromDb = ResultCount::query()->get();

        return Inertia::render('DataHasilAkhir', [
            'hasilHitungFromDb' => $hasilHitungFromDb
        ]);
    })->name('data-hasil-akhir');

    Route::post('/data-hasil-akhir', function (Request $request) {
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
