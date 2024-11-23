export interface IUser {
	email: string;
	lastProject: string;
	readonly id: string;
}

export interface IToken {
	refresh: string;
	access: string;
}
