import type { User } from "../../entities/user";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	async create(data: User) {
		this.users.push(data);
		return data;
	}

	async findByEmail(email: string) {
		return this.users.find((user) => user.email === email) ?? null;
	}
}
