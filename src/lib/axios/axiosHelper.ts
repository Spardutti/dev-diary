import camelcaseKeys from 'camelcase-keys';
import type { AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';

const toCamelCase = (data: unknown): unknown => {
	if (typeof data === 'object' && data !== null) {
		return camelcaseKeys(data as Record<string, unknown>, { deep: true, exclude: [/^\d{4}-\d{2}$/] });
	}
	return data;
};

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
			return toCamelCase(res.data) as Res;
		})
		.catch((err) => {
			throw err;
		});
};
