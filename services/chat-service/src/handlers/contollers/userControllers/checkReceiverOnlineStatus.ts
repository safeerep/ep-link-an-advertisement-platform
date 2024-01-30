export default ( dependencies: any) => {
    const {
        usecases: {
            chatRoomUsecases,
            userUsecases
        }
    } = dependencies;

    const checkIsReceiverOnlineorNot = 
    async ({chatRoomId, senderId, message}: {chatRoomId: string, senderId: string, message: string} ) => {
        try {
            const users = await chatRoomUsecases
            .getUsersIdFromChatroom_usecase(dependencies).interactor(chatRoomId)

            try {
                const receiverId = users.filter((userId: string) => userId !== senderId)
                const chatRoomDocument = await userUsecases
                .checkUserOnlineStatusInARoom_usecase(dependencies).interactor(chatRoomId, receiverId)

                if (chatRoomDocument) {
                    const receiver = chatRoomDocument.users?.find((user: any) => user.userId.toString() === receiverId);
                    if (receiver?.onlineStatus) {
                        // its the only condition that the receiver is currently online;
                        return true
                    }
                    else return false;
                }
                else {
                    return false;
                }  
            } catch (error) {
                console.log(`something went wrong during checking receiver is blocked sender or not ${error}`);
                return false;
            }
        } catch (error) {
            console.log();
            return false;
        }
    }

    return checkIsReceiverOnlineorNot;
}