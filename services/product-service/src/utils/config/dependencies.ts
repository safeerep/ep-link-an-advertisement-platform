import { categoryRepo, productRepo, userRepo } from "../../adapters/database/mongo/repositories"
import { categoryUsecases, productUsecases, userUsecases } from "../../usecases"

const repositories = {
    categoryRepo,
    productRepo,
    userRepo
}

const usecases = {
    categoryUsecases,
    productUsecases,
    userUsecases
}

export default {
    repositories,
    usecases
}