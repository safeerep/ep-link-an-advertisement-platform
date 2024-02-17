import { Server as SocketIOServer, Socket } from 'socket.io'
import { Server } from 'http'
import { handleSocketEvents } from './events'

const connectSocketIO = async ( server: Server) => {
    const io: SocketIOServer = new SocketIOServer( server, {
        cors: {
            origin: process.env.CLIENT_URL
        }
    })

    io.on("connection", (socket: Socket) => {
        console.log('socket io connected');
        handleSocketEvents(socket, io)

        socket.on("disconnect", () => {
            console.log('socket disconnected');
        })
    })
}

export default connectSocketIO;