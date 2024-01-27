import { IMessages } from "../../entities/messageEntities";

export const saveNewMessage_usecase = ( dependencies: any) => {
    const {
        repositories: {
            messageRepo
        }
    } = dependencies;

    const interactor = async ( messageDoc: IMessages) => {
        return await messageRepo.saveMessage(messageDoc)
    }

    return { interactor }
}