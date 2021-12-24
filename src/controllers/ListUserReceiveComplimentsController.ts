import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserReceiveComplimentsController {
  async handle(req: Request, res: Response) {
    
    const listUserSendComplimentsService = new ListUserReceiveComplimentsService(req['user_id'])
    const compliments = await listUserSendComplimentsService.execute()
    return res.json(compliments)
  }
}

export {ListUserReceiveComplimentsController}
