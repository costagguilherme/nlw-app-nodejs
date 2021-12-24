import {UsersRepositories} from "../repositories/UsersRepositories"
import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface IComplimentRequest {
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}


class CreateComplimentService implements IComplimentRequest {

    tag_id: string
    user_sender: string
    user_receiver: string
    message: string

    constructor(tag_id: string, user_sender: string, user_receiver: string, message: string) {
        this.tag_id = tag_id
        this.user_sender = user_sender
        this.user_receiver = user_receiver
        this.message = message
    }

    async execute() {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        const usersRepositories = getCustomRepository(UsersRepositories)

        if (this.user_sender == this.user_receiver) throw new Error("User can not send to yourself")

        const userReceiverExists = await usersRepositories.findOne({id: this.user_receiver})

        if (!userReceiverExists) throw new Error("User reicever do not exists")

        const compliment = complimentsRepositories.create({
            tag_id: this.tag_id,
            user_receiver: this.user_receiver,
            user_sender: this.user_sender,
            message: this.message
        })

        await complimentsRepositories.save(compliment)

        return compliment
    }

}

export {CreateComplimentService}