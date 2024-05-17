import type { User } from "../entities/user";
import type { UsersRepository } from "../repositories/users-repository";

interface CreateUserRequest {
	name: string;
	email: string;
}
interface CreateUserResponse {
	user: User;
}

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		name,
	}: CreateUserRequest): Promise<CreateUserResponse> {
		const emailIsAlreadyInUse = await this.usersRepository.findByEmail(email);

		if (emailIsAlreadyInUse) {
			throw new Error("This email is already in use");
		}

		const user = await this.usersRepository.create({ email, name });

		return { user };
	}
}
