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