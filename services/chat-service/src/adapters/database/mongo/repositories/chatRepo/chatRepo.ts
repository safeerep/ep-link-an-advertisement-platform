import { ChatRoomCollection, ChatRoomDocument } from "../../schemas";
import { UserCollection } from "../../schemas";

export const findIsChatRoomExistingWithTwoSpecificUsers =
    async (currentUserId: string, sellerId: string): Promise<boolean | ChatRoomDocument> => {
        try {
            const existingChatRoom = await ChatRoomCollection.findOne({
                users: {
                    $all: [currentUserId, sellerId]
                }
            })
            // there is no chat room is existing with this two users;
            if (!existingChatRoom) return false
            // returning chatroom document 
            return existingChatRoom as ChatRoomDocument;
        } catch (error) {
            console.log(`an error happened during checking a room is existing with given two userId or not ${error}`);
            return false;
        }
    }

export const createANewChatroom =
    async (usersId: any): Promise<boolean | ChatRoomDocument> => {
        try {
            const newChatroom = await ChatRoomCollection.create(usersId)
            if (!newChatroom) return false;
            return newChatroom as ChatRoomDocument;
        } catch (error) {
            console.log(`an error happened during creating new chatroom with users ${error}`);
            return false;
        }
    }

export const getAllChatsOfCurrentUser = async (currentUserId: string): Promise<ChatRoomDocument[] | boolean> => {
    try {
        const chats = await ChatRoomCollection.find({
            users: {
                $in: [
                    currentUserId
                ]
            }
        }).populate({
            path: 'users',
            model: UserCollection,
            foreignField: 'userId'
        })

        console.log(`-------------------------`);
        console.log(chats);
        console.log(`-------------------------`);

        return chats as ChatRoomDocument[];
    } catch (error) {
        console.log(`something went wrong during fetching all the chats of current user ${error}`);
        return false;
    }
}