import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Kos {
    id: number;
    nama: string;
    gambar: string | null;
    harga: number;
    alamat?: string;
    deskripsi?: string;
    tipe_kamar: 'single' | 'double' | 'suite';
    jumlah_kamar: number;
    kamar_tersedia: number;
    fasilitas?: string;
    fasilitas_tambahan?: string;
    kontak?: string;
    latitude?: string;
    longitude?: string;
    status: 'tersedia' | 'penuh' | 'tutup';
}

interface Props {
    kos: Kos;
}

const breadcrumbs = (namaKos: string): BreadcrumbItem[] => [
    { title: 'Dashboard Owner', href: '/owner/dashboard' },
    { title: 'Data Kos', href: '/owner/kos' },
    { title: namaKos, href: `/owner/kos/${namaKos}/edit` },
];

export default function KosEdit({ kos }: Props) {
    const [form, setForm] = useState({
        nama: kos.nama,
        gambar: null as File | null,
        harga: kos.harga,
        alamat: kos.alamat || '',
        deskripsi: kos.deskripsi || '',
        tipe_kamar: kos.tipe_kamar,
        jumlah_kamar: kos.jumlah_kamar,
        kamar_tersedia: kos.kamar_tersedia,
        fasilitas: kos.fasilitas || '',
        fasilitas_tambahan: kos.fasilitas_tambahan || '',
        kontak: kos.kontak || '',
        latitude: kos.latitude || '',
        longitude: kos.longitude || '',
        status: kos.status,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const name = target.name;

        if (target instanceof HTMLInputElement) {
            const file = target.files?.[0] ?? null; // ambil file pertama atau null
            setForm(prev => ({ ...prev, [name]: file }));
        } else {
            setForm(prev => ({ ...prev, [name]: target.value }));
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in form) {
            const value = form[key as keyof typeof form];
            if (value !== null) {
                data.append(key, value as any);
            }
        }

        router.patch(`/owner/kos/${kos.id}`, data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(kos.nama)}>
            <Head title={`Edit Kos - ${kos.nama}`} />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Edit Kos</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
                    {/* Nama */}
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

                    {/* Gambar */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Gambar</label>
                        {kos.gambar && (
                            <img
                                src={`/storage/${kos.gambar}`}
                                alt={kos.nama}
                                className="w-full h-48 object-cover mb-2 rounded"
                            />
                        )}
                        <input
                            type="file"
                            name="gambar"
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full"
                        />
                    </div>

                    {/* Harga */}
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

                    {/* Alamat */}
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

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Tipe Kamar */}
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

                    {/* Jumlah & Kamar Tersedia */}
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

                    {/* Fasilitas */}
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

                    {/* Fasilitas Tambahan */}
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

                    {/* Kontak */}
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

                    {/* Lokasi */}
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

                    {/* Status */}
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

                    {/* Tombol */}
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
                            Update Kos
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
