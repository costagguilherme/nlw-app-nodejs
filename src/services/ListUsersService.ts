import {UsersRepositories} from "../repositories/UsersRepositories"
import { getCustomRepository } from "typeorm"

class ListUsersService {

    async execute () {
        const usersRepositories = getCustomRepository(UsersRepositories)
        const users = await usersRepositories.find()
        return users
    }

}

export {ListUsersService}