import { z } from 'zod';

export const schema = z
    .object({
        id: z.string().min(1, 'title wajib diisi'),
        title: z.string().min(1, 'title wajib diisi'),
        desc: z.string().min(1, 'desc wajib diisi'),
        tag: z.string().min(1, 'tag wajib diisi'),
        kategori: z.object({
            label: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'kategori.label wajib diisi'),
            value: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'kategori.value wajib diisi'),
        }),
        options: z.array(z.string()).optional(), // optional, tapi akan dipaksa isi di superRefine kalau kategori tertentu
    })
    .superRefine((data, ctx) => {
        const kategoriValue = data.kategori?.value;

        const isOptionField =
            kategoriValue === 'options' || kategoriValue === 'checkbox';

        if (isOptionField && (!data.options || data.options.length < 1)) {
            ctx.addIssue({
                path: ['options'],
                code: z.ZodIssueCode.custom,
                message: 'Options wajib diisi minimal 1 jika kategori adalah options/checkbox',
            });
        }
    });

export const initialSoal = {
    title: '',
    desc: '',
    tag: '',
    kategori: { value: '', label: '' },
    options: []
}
