import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    
    const { name, email, admin, password } = req.body;

    const createUserService = new CreateUserService(name, email, admin, password);

    const user = await createUserService.execute();

    return res.json(user);
  }
}

export { CreateUserController };
