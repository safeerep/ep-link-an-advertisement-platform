import { categoryRepo, productRepo } from "../../adapters/database/mongo/repositories"
import { categoryUsecases, productUsecases } from "../../usecases"

const repositories = {
    categoryRepo,
    productRepo
}

const usecases = {
    categoryUsecases,
    productUsecases
}

export default {
    repositories,
    usecases
}