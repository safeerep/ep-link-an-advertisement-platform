import { premiumPlansRepo } from "../../adapters/database/mongo/repositories"
import { premiumPlanUsecases } from "../../usecases"

const usecases = {
    premiumPlanUsecases
}

const repositories = {
    premiumPlansRepo
}

export default {
    usecases,
    repositories
}