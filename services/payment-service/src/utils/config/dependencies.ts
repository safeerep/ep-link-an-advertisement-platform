import { premiumPlansRepo, premiumMembersRepo } from "../../adapters/database/mongo/repositories"
import { premiumPlanUsecases, premiumMemberUsecases } from "../../usecases"

const usecases = {
    premiumPlanUsecases,
    premiumMemberUsecases
}

const repositories = {
    premiumPlansRepo,
    premiumMembersRepo
}

export default {
    usecases,
    repositories
}