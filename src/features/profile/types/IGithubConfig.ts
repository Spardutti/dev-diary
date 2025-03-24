export interface IGithubConfig {
	readonly id: string;
	author: string;
	installationId: string;
	repo: string;
	owner: string;
	createdAt?: string;
	updatedAt?: string;
	readonly projectId: string;
}
