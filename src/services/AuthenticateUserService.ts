import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare, compareSync } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
    email: string
    password: string
}

class AuthenticateUserService implements IAuthenticateRequest {
    email: string
    password: string;

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
    async execute () {

        const usersRepositories = getCustomRepository(UsersRepositories)
        
        const user = await usersRepositories.findOne({email: this.email})

        if (!user) throw new Error("Email/Password incorrect")

        const decoded = await compareSync(this.password, user.password)

        if (!decoded) throw new Error("Email/Password incorrect")

        const token = sign({email: user.email}, "3805248410673a8be6aa4807e61fb5ae", {subject: user.id, expiresIn: "1d"}) // payload

        return token
    }
}

export {AuthenticateUserService}