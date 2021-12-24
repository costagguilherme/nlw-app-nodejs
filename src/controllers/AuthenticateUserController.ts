import {Request, response, Response} from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController {

    async handle (req: Request, res: Response) {

        const {email, password} = req.body

        const authenticateService = new AuthenticateUserService(email, password)
        const token = await authenticateService.execute()
        return res.json(token)

    }
}

export {AuthenticateUserController}