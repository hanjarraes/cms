import { z } from 'zod';

export const schema = z.object({
    id: z.string().min(1, 'ID wajib diisi'),
    nama: z.string().min(1, 'Nama wajib diisi'),
    email: z.string().email('Email tidak valid'),
    noTelepon: z.string().min(1, 'No Telepon wajib diisi'),
    kategori: z.string().min(1, 'Kategori wajib dipilih'),
    jenisKelamin: z.string().min(1, 'Jenis Kelamin wajib dipilih'),
});

export const initialPartisipan = {
    id: '',
    nama: '',
    email: '',
    noTelepon: '',
    kategori: '',
    jenisKelamin: '',
}