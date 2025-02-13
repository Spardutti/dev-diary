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
		.catch((err) => {
			throw err;
		});
};
