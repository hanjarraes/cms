
import { z } from 'zod';

export const schema = z.object({
    title: z.string().min(1, 'Title wajib diisi'),
    desc: z.string().min(1, 'Desc wajib diisi'),
});

export const initialPartisipanGroup = {
    title: '',
    desc: '',
}