import { initialPartisipan } from 'pages/partisipan/partisipan.validate';
import { z } from 'zod';

export const schema = z.object({
    title: z.string().min(1, 'title wajib diisi'),
    desc: z.string().min(1, 'desc wajib diisi'),
    tag: z.string().email('tag tidak valid'),
    kategori: z.string().min(1, 'kategori wajib diisi'),
});

export const initialSoal = {
    title: '',
    desc: '',
    tag: '',
    kategori: '',
}
