import axios from 'axios';

const services = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL, withCredentials: true });

services.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => error,
);
services.interceptors.response.use(
	(config) => config,
	(error) => error,
);

export default services;
