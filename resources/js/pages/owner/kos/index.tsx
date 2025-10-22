import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Kos {
    id: number;
    nama: string;
    gambar: string | null;
    harga: number;
    fasilitas?: string;
    alamat?: string;
    deskripsi?: string;
    tipe_kamar: 'single' | 'double' | 'suite';
    jumlah_kamar: number;
    kamar_tersedia: number;
    fasilitas_tambahan?: string;
    kontak?: string;
    latitude?: string;
    longitude?: string;
    status: 'tersedia' | 'penuh' | 'tutup';
    created_at: string;
}

interface Props {
    kos: Kos[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard Owner', href: '/owner/dashboard' },
    { title: 'Data Kos', href: '/owner/kos' },
];

export default function KosIndex({ kos }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus kos ini?')) {
            router.delete(`/owner/kos/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kos" />
            <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            Data Kos
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data kos yang kamu miliki
                        </p>
                    </div>
                    <Link
                        href="/owner/kos/create"
                        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                    >
                        + Tambah Kos
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {kos.length > 0 ? (
                        kos.map((item) => (
                            <div
                                key={item.id}
                                className="border border-border rounded-lg bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {item.gambar ? (
                                    <img
                                        src={`/storage/${item.gambar}`}
                                        alt={item.nama}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">{item.nama}</h2>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${item.status === 'tersedia'
                                                    ? 'bg-green-100 text-green-800'
                                                    : item.status === 'penuh'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                    {item.alamat && (
                                        <p className="text-sm text-muted-foreground">{item.alamat}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        {item.fasilitas || '-'}
                                    </p>
                                    <p className="text-sm font-medium text-primary">
                                        Rp {item.harga.toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Tipe Kamar: {item.tipe_kamar}, Kamar Tersedia: {item.kamar_tersedia}/{item.jumlah_kamar}
                                    </p>
                                    <div className="flex justify-end mt-2 gap-2">
                                        <Link
                                            href={`/owner/kos/${item.id}/edit`}
                                            className="text-sm text-primary hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-sm text-red-600 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-muted-foreground text-center py-10 border border-border rounded-lg">
                            Belum ada data kos.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
