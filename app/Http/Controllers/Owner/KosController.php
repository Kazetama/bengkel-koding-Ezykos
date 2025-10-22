<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Kos;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class KosController extends Controller
{
    // Aturan validasi
    protected function rules(): array
    {
        return [
            'nama' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'harga' => 'required|numeric',
            'alamat' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'tipe_kamar' => 'required|in:single,double,suite',
            'jumlah_kamar' => 'required|integer|min:1',
            'kamar_tersedia' => 'required|integer|min:0',
            'fasilitas' => 'nullable|string',
            'fasilitas_tambahan' => 'nullable|string',
            'kontak' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'status' => 'required|in:tersedia,penuh,tutup',
        ];
    }

    // Tampilkan list kos milik owner
    public function index()
    {
        $kos = Kos::where('user_id', Auth::id())->latest()->get();
        return Inertia::render('owner/kos/index', compact('kos'));
    }

    // Form tambah kos baru
    public function create()
    {
        return Inertia::render('owner/kos/create');
    }

    // Simpan kos baru
    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('kos', 'public');
        }

        $validated['user_id'] = Auth::id();
        Kos::create($validated);

        return redirect()->route('owner.kos.index')
            ->with('success', 'Kos berhasil ditambahkan.');
    }

    // Form edit kos
    public function edit($id)
    {
        $kos = Kos::where('id', $id)
                  ->where('user_id', Auth::id())
                  ->firstOrFail(); // Hanya bisa edit kos milik owner

        return Inertia::render('owner/kos/edit', compact('kos'));
    }

    // Update kos
    public function update(Request $request, $id)
    {
        $kos = Kos::where('id', $id)
                  ->where('user_id', Auth::id())
                  ->firstOrFail();

        $validated = $request->validate($this->rules());

        if ($request->hasFile('gambar')) {
            if ($kos->gambar && Storage::disk('public')->exists($kos->gambar)) {
                Storage::disk('public')->delete($kos->gambar);
            }
            $validated['gambar'] = $request->file('gambar')->store('kos', 'public');
        }

        $kos->update($validated);

        return redirect()->route('owner.kos.index')
            ->with('success', 'Kos berhasil diupdate.');
    }

    // Hapus kos
    public function destroy($id)
    {
        $kos = Kos::where('id', $id)
                  ->where('user_id', Auth::id())
                  ->firstOrFail();

        if ($kos->gambar && Storage::disk('public')->exists($kos->gambar)) {
            Storage::disk('public')->delete($kos->gambar);
        }

        $kos->delete();

        return redirect()->route('owner.kos.index')
            ->with('success', 'Kos berhasil dihapus.');
    }
}
