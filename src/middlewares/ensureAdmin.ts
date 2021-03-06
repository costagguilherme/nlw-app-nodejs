import {Request, Response, NextFunction} from "express"
import { getCustomRepository } from "typeorm"
import {UsersRepositories} from "../repositories/UsersRepositories"

export async function ensureAdmin (req:Request, res: Response, next: NextFunction) {
    const { user_id } = req

    const usersRepositories = getCustomRepository(UsersRepositories)

    const { admin } = await usersRepositories.findOne({id: user_id})

    if (admin) return next()
    
    else return res.status(401).json({error: "You are not authorized"})
}