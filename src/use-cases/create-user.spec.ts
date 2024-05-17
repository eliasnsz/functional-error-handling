import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";

describe("Create User Use-Case", async () => {
	const usersRepository = new InMemoryUsersRepository();
	const sut = new CreateUserUseCase(usersRepository);

	it("Should be able to create a new user", async () => {
		const data = {
			name: "John Doe",
			email: "johndoe@example.com",
		};

		const { user } = await sut.execute(data);

		expect(user).toMatchObject(data);
		expect(usersRepository.users.length).toStrictEqual(1);
	});

	it("Should not be able to create an user with existent email", async () => {
		const data = {
			name: "John Doe",
			email: "johndoe@example.com", // email existente
		};

		await expect(sut.execute(data)).rejects.toBeInstanceOf(Error);
		expect(usersRepository.users.length).toStrictEqual(1);
	});
});
