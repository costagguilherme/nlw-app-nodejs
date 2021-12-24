import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

class ListUserSendComplimentsController {
  async handle(req: Request, res: Response) {
    
    const listUserSendComplimentsService = new ListUserSendComplimentsService(req['user_id'])
    const compliments = await listUserSendComplimentsService.execute()
    return res.json(compliments)
  }
}

export {ListUserSendComplimentsController}
