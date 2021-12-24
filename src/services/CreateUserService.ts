import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {hash} from "bcryptjs"

interface IUserRequest {name: string; email: string; admin?: boolean; password: string}

class CreateUserService implements IUserRequest {
  name: string
  email: string
  password: string;
  admin?: boolean

  constructor (name: string, email: string, admin: boolean, password: string) {
    this.name = name
    this.email = email
    this.password = password
    if (admin) this.admin = true
    else this.admin = false
  }

  async execute() {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!this.email) throw new Error("Email incorrect");
    
    const userAlreadyExists = await usersRepository.findOne({email: this.email});

    if (userAlreadyExists) throw new Error("User already exists");

    const passHash = await hash(this.password, 8)
    
    const user = usersRepository.create({name: this.name, email: this.email, admin: this.admin, password: passHash});

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
