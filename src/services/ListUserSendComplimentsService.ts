import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"


class ListUserSendComplimentsService {
    user_id: string
    constructor (user_id: string) {
        this.user_id = user_id
        console.log(this.user_id)
    }

    async execute() {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const compliments = complimentsRepositories.find({
            where: {user_sender: this.user_id}
        })

        return compliments
    }
}

export { ListUserSendComplimentsService }