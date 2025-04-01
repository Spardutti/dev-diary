import type { IGithubConfig } from '@/features/profile/types/IGithubConfig';
import type { IResponse, IPaginatedResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const createGithubConfig = ({ owner, repo, author, installationId, projectId }: Omit<IGithubConfig, 'id'>) =>
	axiosHelper<IResponse<IGithubConfig>>({
		method: 'post',
		url: '/github/create',
		data: { owner, repo, author, installationId, projectId },
	});

export const getGithubConfigs = ({ projectId }: { projectId: string }) =>
	axiosHelper<IPaginatedResponse<IGithubConfig[]>>({ method: 'get', url: '/github/list', urlParams: { projectId } });

export const updateGithubConfig = ({ owner, repo, author, installationId, projectId, id }: IGithubConfig) =>
	axiosHelper<IResponse<IGithubConfig>>({
		method: 'put',
		url: `/github/update/${id}`,
		data: { owner, repo, author, installationId, projectId },
	});

export const deleteGithubConfig = ({ id, projectId }: { id: string; projectId: string }) =>
	axiosHelper({ method: 'delete', url: `/github/delete/${id}`, data: projectId });
