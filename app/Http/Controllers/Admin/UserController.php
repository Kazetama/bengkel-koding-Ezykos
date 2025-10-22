<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Menampilkan daftar user dengan fitur pencarian dan pagination.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::query()
            ->select('id', 'name', 'email', 'usertype', 'created_at')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString(); // biar query search tetap ada di URL pagination

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Mengupdate role user.
     */
    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'usertype' => 'required|in:admin,owner,user',
        ]);

        $user->update(['usertype' => $validated['usertype']]);

        return redirect()
            ->back()
            ->with('success', "Role {$user->name} berhasil diubah menjadi {$validated['usertype']}.");
    }

    /**
     * Menghapus user (opsional, kalau nanti butuh fitur delete).
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()
            ->back()
            ->with('success', "User {$user->name} berhasil dihapus.");
    }
}
