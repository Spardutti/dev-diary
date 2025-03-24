import type { IGithubConfig } from '@/features/profile/types/IGithubConfig';
import type { IPaginatedResponse, IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const createGithubConfig = ({ owner, repo, author, installationId, projectId }: Partial<IGithubConfig>) =>
	axiosHelper({ method: 'post', url: '/github/create', data: { owner, repo, author, installationId, projectId } });

export const getGithubConfigs = ({ projectId }: { projectId: string }) =>
	axiosHelper<IPaginatedResponse<IGithubConfig[]>>({ method: 'get', url: '/github/list', urlParams: { projectId } });
