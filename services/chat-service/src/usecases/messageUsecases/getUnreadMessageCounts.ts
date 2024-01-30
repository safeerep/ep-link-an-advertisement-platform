import { ChatRoomDocument } from "../../adapters/database/mongo/schemas";

export const getUnreadMessageCounts_usecase = (dependencies: any) => {
    const {
        repositories: {
            messageRepo
        }
    } = dependencies;

    const interactor = async ( userId: string, chats: ChatRoomDocument[]) => {
        return await messageRepo.countOfUnreadMessagesInEachChat(userId, chats)
    }

    return { interactor }
}