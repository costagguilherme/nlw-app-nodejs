import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"



class ListUserReceiveComplimentsService {
    user_id: string
    constructor (user_id: string) {this.user_id = user_id}

    async execute() {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const compliments = complimentsRepositories.find({
            where: {user_receiver: this.user_id},
            relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments
    }
}

export { ListUserReceiveComplimentsService }