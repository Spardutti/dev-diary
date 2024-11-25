export interface IUser {
	email: string;
	lastVisitedProject: string;
	readonly id: string;
}

export interface IToken {
	refresh: string;
	access: string;
}
