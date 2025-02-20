import { logout, refresh } from '@/features/auth/api/authApi';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true, // Ensures cookies are sent
});

export const setDefaultHeaders = (token: string | null) => {
	if (!token) {
		delete axiosInstance.defaults.headers.common['Authorization'];
	} else {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});
	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		//  If the request gets a 401 AND it's NOT a retry request
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true; // Mark it to prevent infinite loops

			if (isRefreshing) {
				//  If refresh is already in progress, queue the request
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					// Once refresh completes, retry original request
					originalRequest.headers['Authorization'] = `Bearer ${token}`;
					return axiosInstance(originalRequest);
				});
			}

			isRefreshing = true;
			try {
				const response = await refresh();
				const newToken = response.data.token;
				localStorage.setItem('authToken', newToken);

				axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

				// Retry all queued requests with the new token
				processQueue(null, newToken);

				// Retry the original failed request
				originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
				return axiosInstance(originalRequest);
			} catch (error) {
				processQueue(error, null); // Reject all queued requests
				await logout();
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export interface IResponse<T> {
	status: 200 | 201 | 401 | 400;
	data: T;
}

export interface IPaginatedResponse<T> {
	next: string | null;
	previous: string | null;
	results: T[];
}
