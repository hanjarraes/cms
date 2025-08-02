import { z } from 'zod';

export const schema = z
    .object({
        id: z.string().min(1, 'title wajib diisi'),
        title: z.string().min(1, 'title wajib diisi'),
        desc: z.string().min(1, 'desc wajib diisi'),
        tag: z.object({
            label: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'kategori.label wajib diisi'),
            value: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'kategori.value wajib diisi'),
        }),
    });

export const initialSoal = {
    title: '',
    desc: '',
    tag: { value: '', label: '' },
}
