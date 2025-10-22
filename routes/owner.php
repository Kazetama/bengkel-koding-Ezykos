<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Owner\DashboardController;

Route::middleware(['auth', 'verified', 'role:owner'])
    ->prefix('owner')
    ->name('owner.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
