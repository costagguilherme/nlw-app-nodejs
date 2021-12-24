import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {

    async handle (req: Request, res: Response) {
        const {tag_id, user_receiver, message} = req.body
        const user_sender = req['user_id']
        const createComplimentService = new CreateComplimentService(tag_id, user_sender, user_receiver, message)
        const compliment = await createComplimentService.execute()
        res.json(compliment)
    }

    
}

export {CreateComplimentController}