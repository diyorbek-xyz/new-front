import axios from 'axios';

console.log(process.env.NEXT_PUBLIC_BASE_URL);
const services = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL, withCredentials: true });

services.interceptors.request.use(
	(config) => config,
	(error) => error,
);
services.interceptors.response.use(
	(config) => config,
	(error) => error,
);

export default services;
