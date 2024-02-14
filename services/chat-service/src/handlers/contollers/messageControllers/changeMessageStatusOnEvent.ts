export default (dependencies: any) => {
    const {
        usecases: {
            messageUsecases
        }
    } = dependencies;

    const updateMessageStatusAsReadOnEvent = async (userId: string, roomId: string ) => {
        try {
            // here we will get userId and roomId in as parameters;
            const messageStatusUpdated = await messageUsecases
            .changeMessageStatusAsRead_usecase(dependencies).interactor( userId, roomId)

            if (messageStatusUpdated) {
                console.log("successfully updated message status as read on the time user joined in the room");
            }
        } catch (error) {
            console.log(`something went wrong during updating message status as read on the time user joined in the room ${error}`);
        }

    }

    return updateMessageStatusAsReadOnEvent;
}