import mongoose, { Schema } from 'mongoose';
import { IMessages } from '../../../../entities/messageEntities';

const MessagesSchema: Schema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    chatRoomId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    showToSender: {
        type: Boolean,
        default: true,
        required: true
    },
    showToReceiver: {
        type: Boolean,
        default: true,
        required: true
    },
}, {
    timestamps: true
});

const MessagesCollection = mongoose.model<IMessages>('messages', MessagesSchema);

export default MessagesCollection;

export interface MessageDocument extends IMessages {
    createdAt: Date;
    updatedAt: Date;
}