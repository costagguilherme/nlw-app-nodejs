import {Request, Response, NextFunction, request} from "express"
import {verify} from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticate (req:Request, res: Response, next: NextFunction) {
    
    const bearerToken = req.headers['authorization']

    if (!bearerToken) return res.status(401).end()

    const token = (bearerToken.split(" "))[1]


    try {
        const {sub} = verify(token, "3805248410673a8be6aa4807e61fb5ae") as IPayload
        req.user_id = sub

        return next()
        
    } catch (error) {
        res.status(401).end()
    }
    
}