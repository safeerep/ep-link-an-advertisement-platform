export default ( dependencies: any) => {
    const {
        usecases: {
            chatRoomUsecases,
            userUsecases
        }
    } = dependencies;

    const checkIsReceiverBlockedSenderOrNot = 
    async ({chatRoomId, senderId, message}: {chatRoomId: string, senderId: string, message: string} ) => {
        try {
            const users = await chatRoomUsecases
            .getUsersIdFromChatroom_usecase(dependencies).interactor(chatRoomId)

            try {
                const receiverId = users.filter((userId: string) => userId !== senderId)
                const isBlocked = await userUsecases
                .checkIsReceiverBlockedSender_usecase(dependencies).interactor(receiverId, senderId)

                if (isBlocked) {
                    return true;
                }
                else {
                    // its the only condition we are returning/letting user to message
                    return false;
                }
            } catch (error) {
                console.log(`something went wrong during checking receiver is blocked sender or not ${error}`);
                return true;
            }
        } catch (error) {
            console.log();
            return true;
        }
    }

    return checkIsReceiverBlockedSenderOrNot;
}