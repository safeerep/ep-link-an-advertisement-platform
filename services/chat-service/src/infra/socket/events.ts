import { Socket, Server } from "socket.io"
// importing controller to check receiver is blocked or not the sender;
import userControllers from "../../handlers/contollers/userControllers"
import messageControllers from "../../handlers/contollers/messageControllers"
import dependencies from "../../utils/config/dependencies"

const {
    checkIsReceiverBlockedController
} = userControllers(dependencies)

const {
    changeMessageStatusOnEventController
} = messageControllers(dependencies)

export const handleSocketEvents = ( socket: Socket, io: Server) => {
    let onlineUsers: string[] = []

    socket.on("join-user-room", (userId: string) => {
        socket.join(userId)
        onlineUsers.push(userId)
        io.emit("online-users", onlineUsers)
        console.log('user joined in user room');
    })

    socket.on("user-left", (userId: string) => {
        socket.leave(userId)
        const onlineUsersUpdated: string[] = onlineUsers.filter((user: string) => {
            return user !== userId;
        })
        onlineUsers = onlineUsersUpdated;
        io.emit("online-users", onlineUsers)
        console.log('user left');
    })

    socket.on("join-room", async ( prevRoom: string, roomId: string, userId: string) => {
        await changeMessageStatusOnEventController( userId, roomId)
        socket.leave(prevRoom)
        console.log(`prev room `, prevRoom);
        socket.join(roomId)
        console.log('user joined in a room');
    })

    socket.on("send-message", async ( data: any) => {
        console.log('ok in backend send message event happened');
        console.log(data);
        const isBlocked: boolean | any = await checkIsReceiverBlockedController(data);
        if (!isBlocked) {
            socket.in(data?.chatRoomId).emit("show-message", data)
            socket.to(data?.receiverId).emit("show-notification", data)
        }
        else {
            socket.in(data?.senderId).emit("receiver-blocked", data)
        }
    })
    
    socket.on("typing", ({chatRoomId, senderId}: {chatRoomId: string, senderId: string}) => {
        socket.in(chatRoomId).emit("typing", ({ chatRoomId, senderId}))
        console.log('typing happened');
    })

    // call related events starting

    socket.on("call-user", async (data) => {
        console.log('call user in backend');
        console.log(data);   
        const obj = {
            chatRoomId: data.roomId, 
            senderId: data.fromUserId, 
            message: ""
        }
        const isBlocked: boolean | any = await checkIsReceiverBlockedController(obj);
        if (!isBlocked) {
            socket.to(data?.to).emit("calling-user", data)      
        }
    })

    socket.on('call-declined', (data) => {
        console.log(`call declined by receiver`);
        console.log(data);        
        socket.to(data.fromUserId).emit("receiver-declined", data);
    });
    
    socket.on("call-ended", (data) => {
        console.log("call ended");
        console.log(data);
        socket.to(data?.to).emit("call-ended", data)      
        socket.to(data?.fromUserId).emit("call-ended", data)      
    })

    // call related events ending
}