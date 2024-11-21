export interface IUser {
	email: string;
	lastProject: string | null;
	readonly id: string;
}

export interface IToken {
	refresh: string;
	access: string;
}
