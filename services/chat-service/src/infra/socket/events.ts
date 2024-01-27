import { Socket } from "socket.io"
// importing controller to check receiver is blocked or not the sender;
import userControllers from "../../handlers/contollers/userControllers"
import dependencies from "../../utils/config/dependencies"

const {
    checkIsReceiverBlockedController
} = userControllers(dependencies)

export const handleSocketEvents = ( socket: Socket) => {

    socket.on("join-room", ( roomId: string, userId: string) => {
        socket.join(roomId)
        console.log(`user joined in a room`);
    })
    socket.on("send-message", async ( data: any) => {
        console.log(`ok in backend send message event happened`);
        console.log(data);
        const isBlocked: boolean | any = await checkIsReceiverBlockedController(data);
        if (!isBlocked) {
            socket.in(data?.chatRoomId).emit("show-message", data)
        }
        else {
            socket.in(data?.chatRoomId).emit("receiver-blocked", data)
        }
    })


    socket.on("typing", (roomId: string) => {
        socket.in(roomId).emit("typing")
        console.log(`typing happened`);
    })
}