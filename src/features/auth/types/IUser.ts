export interface IUser {
	id: string;
	email: string;
	name: string;
	lastVisitedProjectId: string;
	isGuest: boolean;
}

export interface ILoginPayload {
	email: string;
	password: string;
}

export interface ISignupPayload {
	email: string;
	password: string;
	name: string;
}
