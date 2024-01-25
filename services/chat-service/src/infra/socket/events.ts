import { Socket } from "socket.io"

export const handleSocketEvents = ( socket: Socket) => {
    socket.on("send-message", ( data: any) => {
        console.log(`ok in backend send message event happened`);
        console.log(data);  
        socket.emit("message-saved")
    })


    socket.on("typing", (roomId: string) => {
        socket.in(roomId).emit("typing")
        console.log(`typing happened`);
    })
}