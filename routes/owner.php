<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Owner\DashboardController;
use App\Http\Controllers\Owner\KosController;

Route::middleware(['auth', 'verified', 'role:owner'])
    ->prefix('owner')
    ->name('owner.')
    ->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('kos', KosController::class)->except(['show']);
});
