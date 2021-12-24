import { Request, Response } from "express";
import {ListUsersService} from "../services/ListUsersService"
class ListUsersController {

    async handle (req: Request, res: Response) {
        const listUsersService = new ListUsersService()
        const users = await listUsersService.execute()
        users.forEach(user => {delete user['password']})
        console.log(users)
        return res.json(users)
    }

}

export {ListUsersController}