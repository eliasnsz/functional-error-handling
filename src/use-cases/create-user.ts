import type { User } from "../entities/user";
import { failure, success, type Either } from "../errors/either";
import type { UsersRepository } from "../repositories/users-repository";

interface CreateUserRequest {
	name: string;
	email: string;
}

type CreateUserResponse = Either<{ message: string }, { user: User }>;

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		name,
	}: CreateUserRequest): Promise<CreateUserResponse> {
		const emailIsAlreadyInUse = await this.usersRepository.findByEmail(email);

		if (emailIsAlreadyInUse) {
			return failure({ message: "This email is already in use." });
		}

		const user = await this.usersRepository.create({ email, name });

		return success({
			user,
		});
	}
}
