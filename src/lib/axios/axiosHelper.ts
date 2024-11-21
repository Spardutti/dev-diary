import camelcaseKeys from 'camelcase-keys';
import type { AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';

const toCamelCase = (data: unknown): unknown => {
	if (typeof data === 'object' && data !== null) {
		return camelcaseKeys(data as Record<string, unknown>, { deep: true });
	}
	return data;
};

export const axiosHelper = async <Res, Params = unknown, Data = unknown>({
	method,
	url,
	urlParams,
	data,
}: {
	method: 'get' | 'post' | 'put' | 'delete' | 'patch';
	url: string;
	urlParams?: Params;
	data?: Data;
}): Promise<Res> => {
	return axiosInstance[method]<Res>(url, method === 'get' ? { params: urlParams } : data)
		.then((res: AxiosResponse<Res>) => {
			return toCamelCase(res.data) as Res;
		})
		.catch((err) => {
			if (err.response?.data?.errors) {
				throw new Error(JSON.stringify(err.response.data.errors));
			} else if (err.response?.data?.error) {
				throw new Error(JSON.stringify(err.response.data.error));
			} else {
				throw err;
			}
		});
};
