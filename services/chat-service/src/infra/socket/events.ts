import { Socket } from "socket.io"
// importing controller to check receiver is blocked or not the sender;
import userControllers from "../../handlers/contollers/userControllers"
import dependencies from "../../utils/config/dependencies"

const {
    checkIsReceiverBlockedController
} = userControllers(dependencies)

export const handleSocketEvents = ( socket: Socket) => {

    socket.on("join-user-room", (userId: string) => {
        socket.join(userId)
        console.log('user joined in user room');
    })

    socket.on("join-room", ( roomId: string, userId: string) => {
        socket.join(roomId)
        console.log('user joined in a room');
    })

    socket.on("send-message", async ( data: any) => {
        console.log('ok in backend send message event happened');
        console.log(data);
        const isBlocked: boolean | any = await checkIsReceiverBlockedController(data);
        if (!isBlocked) {
            socket.in(data?.chatRoomId).emit("show-message", data)
        }
        else {
            socket.in(data?.chatRoomId).emit("receiver-blocked", data)
        }
    })
    
    socket.on("typing", ({chatRoomId, senderId}: {chatRoomId: string, senderId: string}) => {
        socket.in(chatRoomId).emit("typing", ({ chatRoomId, senderId}))
        console.log('typing happened');
    })

    // call related events starting

    socket.on("call-user", (data) => {
        console.log('call user in backend');
        console.log(data);   
        socket.to(data?.to).emit("calling-user", data)      
    })

    socket.on('call-accepted', (data) => {
        console.log(`call accepted `);
        console.log(data);        
        socket.in(data.to).emit("receiver-accepted", data.signalData);
    });
    
    socket.on("call-rejected", (data) => {
        console.log("call rejected");
        console.log(data);
        socket.to(data?.to).emit("call-rejected", data)      
    })

    socket.on("call-cancelled", (data) => {
        console.log('call rejected');
        console.log(data);
        socket.to(data?.to).emit("call-cancelled", data)      
    })

    // call related events ending
}