import { z } from 'zod';

export const schema = z.object({
    nama: z.string().min(1, 'Nama wajib diisi'),
    email: z.string().email('Email tidak valid'),
    noTelepon: z.string().min(1, 'No Telepon wajib diisi'),
    jenisKelamin: z.string().min(1, 'Jenis Kelamin wajib dipilih'),
    profile_picture: z.string().min(1, 'Jenis Kelamin wajib dipilih'),
});

export const initialStaff = {
    nama: '',
    email: '',
    noTelepon: '',
    jenisKelamin: '',
    profile_picture: '',
}
