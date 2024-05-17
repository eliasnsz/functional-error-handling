import { randomUUID } from "node:crypto";

interface UserProps {
	id: string;
	name: string;
	email: string;
}

export class User {
	public id?: string;
	public name: string;
	public email: string;

	constructor(props: UserProps) {
		this.id = randomUUID();
		this.name = props.name;
		this.email = props.email;
	}
}
