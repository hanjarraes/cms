import { z } from 'zod';


export const schema = z
    .object({
        title: z.string().min(1, 'title wajib diisi'),
        desc: z.string().min(1, 'desc wajib diisi'),
        tag: z.object({
            label: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'tag.label wajib diisi'),
            value: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'tag.value wajib diisi'),
        }),
        kategori: z.object({
            label: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'kategori.label wajib diisi'),
            value: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'kategori.value wajib diisi'),
        }),
        type: z.object({
            label: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'type.label wajib diisi'),
            value: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'type.value wajib diisi'),
        }),
        options: z.array(z.object({
            type: z.string(),
            value: z.string(),
            isCorrect: z.boolean().optional(),
        })).optional(),
    })
    .superRefine((data, ctx) => {
        const typeValue = data.type?.value;
        const isOptionField = typeValue === 'options' || typeValue === 'checkbox';

        if (isOptionField) {
            if (!data.options || data.options.length < 1) {
                ctx.addIssue({
                    path: ['options'],
                    code: z.ZodIssueCode.custom,
                    message: 'Options wajib diisi minimal 1 jika kategori adalah options/checkbox',
                });
            }

            const correctCount = data.options?.filter(opt => opt.isCorrect)?.length || 0;

            if (typeValue === 'options' && correctCount !== 1) {
                ctx.addIssue({
                    path: ['options'],
                    code: z.ZodIssueCode.custom,
                    message: 'Tipe "options" harus memiliki tepat 1 jawaban yang benar',
                });
            }

            if (typeValue === 'checkbox' && correctCount < 1) {
                ctx.addIssue({
                    path: ['options'],
                    code: z.ZodIssueCode.custom,
                    message: 'Tipe "checkbox" harus memiliki minimal 1 jawaban benar',
                });
            }
        }
    })

export const initialSoal = {
    title: '',
    desc: '',
    tag: undefined,
    kategori: undefined,
    type: undefined,
    options: []
}



export const schemaGroup = z
    .object({
        title: z.string().min(1, 'title wajib diisi'),
        desc: z.string().min(1, 'desc wajib diisi'),
        tag: z.object({
            label: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'tag.label wajib diisi'),
            value: z.string().or(z.number())
                .refine((val: string | number) => `${val}`.length > 0, 'tag.value wajib diisi'),
        })
    });

export type IFormBankSoalGroup = z.infer<typeof schema>;


export const initialSoalGroup = {
    title: '',
    desc: '',
    tag: undefined,
    kategori: undefined,
    type: undefined,
    options: []
}
