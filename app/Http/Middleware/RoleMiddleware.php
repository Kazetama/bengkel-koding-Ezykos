<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        $userRole = $user->usertype ?? 'user';

        // Kalau role user beda dari yang diminta
        if ($userRole !== $role) {
            // Arahkan ke dashboard sesuai role dia
            switch ($userRole) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'owner':
                    return redirect()->route('owner.dashboard');
                default:
                    return redirect()->route('dashboard');
            }
        }

        // Validasi tambahan supaya gak bisa akses URL role lain
        $path = trim($request->path(), '/');

        if ($userRole === 'admin' && !str_starts_with($path, 'admin')) {
            return redirect()->route('admin.dashboard');
        }

        if ($userRole === 'owner' && !str_starts_with($path, 'owner')) {
            return redirect()->route('owner.dashboard');
        }

        if ($userRole === 'user' && str_starts_with($path, 'admin')) {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
