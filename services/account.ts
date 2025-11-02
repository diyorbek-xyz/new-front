import { LoginType, SigninType } from '@/types/account';
import services from '.';
import { z } from 'zod';

const account = {
	login: (data: LoginType) => services.post('/login', data),
	logout: () => services.get('/logout'),
	signup: (data: SigninType) => services.post('/signup', data),
};
export const loginSchema = z.object({
	username: z.string({ error: 'Foydalanuvchi nomingizni kiriting' }).min(4, { error: 'Foydalanuvchi nomi kamida 4ta harfdan tashkil topishi kerak' }).max(30, { error: "Foydalanuvchi nomi ko'pi bilan 30ta harfdan tashkil topishi kerak" }),
	password: z.string({ error: 'Parolingizni kiring' }).min(8, { error: 'Parol kamida 8ta harfdan tashkil topishi kerak' }).max(16, { error: "Parol ko'pi bilan 16ta elementdan tashkil topishi kerak" }),
});

export default account;
