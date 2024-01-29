import { usecases, adminUsecases } from "../../usecases";
import { userRepo } from "../../adapters/database/mongo/repositories";
import { adminRepo } from "../../adapters/database/mongo/repositories";

const repositories: any = {
    userRepo,
    adminRepo
};

export = {
  usecases,
  adminUsecases,
  repositories,
};
