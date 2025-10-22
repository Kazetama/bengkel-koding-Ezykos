import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard Owner', href: '/owner/dashboard' },
    { title: 'Data Kos', href: '/owner/kos' },
    { title: 'Tambah Kos', href: '/owner/kos/create' },
];

export default function KosCreate() {
    const [form, setForm] = useState({
        nama: '',
        gambar: null as File | null,
        harga: 0,
        alamat: '',
        deskripsi: '',
        tipe_kamar: 'single',
        jumlah_kamar: 1,
        kamar_tersedia: 1,
        fasilitas: '',
        fasilitas_tambahan: '',
        kontak: '',
        latitude: '',
        longitude: '',
        status: 'tersedia',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const name = target.name;

        if (target instanceof HTMLInputElement && target.files?.[0]) {
            const file = target.files[0]; // pasti ada, TS aman
            setForm((prev) => ({ ...prev, [name]: file }));
        } else {
            setForm((prev) => ({ ...prev, [name]: target.value }));
        }
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in form) {
            if (form[key as keyof typeof form] !== null) {
                data.append(key, form[key as keyof typeof form] as any);
            }
        }
        router.post('/owner/kos', data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kos" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Tambah Kos Baru</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama Kos</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Gambar</label>
                        <input
                            type="file"
                            name="gambar"
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
                        <input
                            type="number"
                            name="harga"
                            value={form.harga}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Alamat</label>
                        <input
                            type="text"
                            name="alamat"
                            value={form.alamat}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tipe Kamar</label>
                        <select
                            name="tipe_kamar"
                            value={form.tipe_kamar}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Jumlah Kamar</label>
                            <input
                                type="number"
                                name="jumlah_kamar"
                                value={form.jumlah_kamar}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                                min={1}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Kamar Tersedia</label>
                            <input
                                type="number"
                                name="kamar_tersedia"
                                value={form.kamar_tersedia}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                                min={0}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Fasilitas</label>
                        <input
                            type="text"
                            name="fasilitas"
                            value={form.fasilitas}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Fasilitas Tambahan</label>
                        <input
                            type="text"
                            name="fasilitas_tambahan"
                            value={form.fasilitas_tambahan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Kontak</label>
                        <input
                            type="text"
                            name="kontak"
                            value={form.kontak}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                value={form.latitude}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Longitude</label>
                            <input
                                type="text"
                                name="longitude"
                                value={form.longitude}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="tersedia">Tersedia</option>
                            <option value="penuh">Penuh</option>
                            <option value="tutup">Tutup</option>
                        </select>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Link
                            href="/owner/kos"
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition"
                        >
                            Simpan Kos
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
