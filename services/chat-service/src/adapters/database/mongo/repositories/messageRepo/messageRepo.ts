import { IMessages } from "../../../../../entities/messageEntities";
import { MessagesCollection, MessageDocument } from "../../schemas";

export const saveMessage = async ( messageDocument: IMessages): Promise<boolean | MessageDocument> => {
    try {
        const newMessage = await MessagesCollection.create(messageDocument)
        if (!newMessage) return false;
        return newMessage as MessageDocument;
    } catch (error) {
        console.log(`an error happened during saving a new message ${error}`);
        return false;
    }
}

export const getMessagesFromASpecificRoom = 
    async ( roomId: string):Promise<boolean | MessageDocument[]> => {
        try {
            const messages = await MessagesCollection.find({
                chatRoomId: roomId
            })
            if (!messages) return false;
            return messages as MessageDocument[];
        } catch (error) {
            console.log(`an error happened during fetching messages from a specific room ${error}`);
            return false;
        }
}

export const countOfUnreadMessagesInEachChat = async ( userId: string, chats: any) => {
    try {
        const allRoomsWithUnreadMessagesCount = [];
        const takeCount = async ( chatRoomId: string) => {
            const unReadMessageCounts = await MessagesCollection.aggregate([
                {
                    $match: {
                        chatRoomId: chatRoomId,
                        senderId: {
                            $ne: userId
                        },
                        unRead: true
                    }
                }, {
                    $group: {
                        _id: chatRoomId,
                        totalUnread: {
                            $sum: 1
                        }
                    }
                }
            ])
            return unReadMessageCounts;
        }

        for (const chatDoc of chats) {
            const roomIdAndCount = await takeCount(chatDoc?.chatRoomId);
            allRoomsWithUnreadMessagesCount.push(roomIdAndCount[0]);
        }

        return allRoomsWithUnreadMessagesCount;
    } catch (error) {
        console.log(`an error happened during taking the count of unread messages in each chat`);
        return false;
    }
}