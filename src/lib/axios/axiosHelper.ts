import type { AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';

export const axiosHelper = async <Res, Params = unknown, Data = unknown>({
	method,
	url,
	urlParams,
	data,
	headers,
}: {
	method: 'get' | 'post' | 'put' | 'delete' | 'patch';
	url: string;
	urlParams?: Params;
	data?: Data;
	headers?: {
		Authorization?: `Bearer ${string}`;
	};
}): Promise<Res> => {
	return axiosInstance[method]<Res>(url, method === 'get' ? { params: urlParams, headers } : data, { headers })
		.then((res: AxiosResponse<Res>) => {
			return res.data;
		})
		.catch((error: unknown) => {
			if (error instanceof Error && 'response' in error) {
				const axiosError = error as { response?: { data?: { error?: string }; status?: number } };
				const errorMessage = axiosError.response?.data?.error || 'An unexpected error occurred';
				throw new Error(errorMessage);
			}
			throw error;
		});
};
