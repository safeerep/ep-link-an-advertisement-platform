import { chatRepo, messageRepo } from "../../adapters/database/mongo/repositories"
import { chatRoomUsecases, messageUsecases } from "../../usecases"

const usecases = {
    chatRoomUsecases,
    messageUsecases
}

const repositories = { 
    chatRepo, 
    messageRepo 
}

export default {
    repositories,
    usecases
}