import { IUser } from "../../entities/userEntities";

export const updateUser_usecase = ( dependencies: any) => {
    const {
        repositories: {
            userRepo
        }
    } = dependencies;

    const interactor = async ( userId: string, userData: IUser) => {

        console.log(`kkkkkkkkkkkkkkkkk`);
        console.log(userId);
        console.log(userData);
        console.log(`kkkkkkkkkkkkkkkkk`);
        
        return await userRepo.updateUser(userId, userData)
    }

    return { interactor }
}