export type Buku = {
    id: string;
    judul: string;
    deskripsi: string;
    tahun: string;
    kategori: string;
    status: string;
    peminjam: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}
export type Status = 'borrowed' | 'unavailable';

export type CreateBukuPayload = {
    judul: string;
    deskripsi: string;
    tahun: string;
    kategori: string;
    status: string;
    peminjam: string;
    imageUrl: string
};

export type Peminjam = {
    peminjam: { 
        nama: string
    }
}