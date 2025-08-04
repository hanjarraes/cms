import { z } from 'zod';

export const schema = z.object({
    id: z.string().min(1, 'ID wajib diisi'),
    nama: z.string().min(1, 'Nama wajib diisi'),
    email: z.string().email('Email tidak valid'),
    noTelepon: z.string().min(1, 'No Telepon wajib diisi'),
    kategori: z.object({
        label: z.string().or(z.number())
            .refine((val: string | number) => `${val}`.length > 0, 'kategori.label wajib diisi'),
        value: z.string().or(z.number())
            .refine((val: string | number) => `${val}`.length > 0, 'kategori.value wajib diisi'),
    }),
    jenisKelamin: z.string().min(1, 'Jenis Kelamin wajib dipilih'),
});

export const initialSchedule = {
    id: '',
    nama: '',
    email: '',
    noTelepon: '',
    kategori: undefined,
    jenisKelamin: '',
}