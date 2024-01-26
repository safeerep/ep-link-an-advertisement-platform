import { chatRepo, messageRepo, userRepo } from "../../adapters/database/mongo/repositories"
import { chatRoomUsecases, messageUsecases, userUsecases } from "../../usecases"

const usecases = {
    chatRoomUsecases,
    messageUsecases,
    userUsecases
}

const repositories = { 
    chatRepo, 
    messageRepo,
    userRepo 
}

export default {
    repositories,
    usecases
}