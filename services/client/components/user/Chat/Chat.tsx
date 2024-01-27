import { GrMore } from 'react-icons/gr'
import { IoIosCall } from 'react-icons/io'
import { BsCameraVideoFill } from 'react-icons/bs'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUserChatRooms } from '@/store/actions/userActions/userActions'
import { io } from 'socket.io-client'
import { SOCKET_BASE_URL } from '@/constants'

const Chat = () => {
    const socket = io(`${SOCKET_BASE_URL}`)

    const dispatch: any = useDispatch();
    const searchParams = useSearchParams();
    const roomId: string | any = searchParams.get("room");
    const [message, setMessage] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const seller = useSelector((state: any) => state?.user?.data?.seller)
    const messages = useSelector((state: any) => state?.user?.data?.messages)
    const chats = useSelector((state: any) => state?.user?.data?.chats)
    const user: any = useSelector((state: any) => state?.user?.data?.userData)


    useEffect(() => {
        dispatch(getCurrentUserChatRooms())
        if (roomId) {
            inputRef?.current?.focus()
        }
    }, [])

    useEffect(() => {
        socket.emit("join-room", roomId, user?._id)
    }, [roomId, user?._id])

    const sendMessage = () => {
        console.log(`clicked for sendMessage`);

        if (!message) return;
        console.log(`yes message have `, message);

        socket.emit("send-message", {
            message: message,
            chatroomId: roomId,
            senderId: user?._id
        })
        dispatch()
    }

    socket.on("show-message", (data: any) => {

    })

    return (
        <div className="flex justify-around gap-2 p-4">

            {/* if inbox is empty, it will shows */}
            {/* <div className="lg:w-1/3 md:w-1/2 w-full bg-blue-200 p-2 rounded-lg">
                <div className="w-full flex justify-center border-b-2 border-black">
                    INBOX
                </div>
                <div className=" flex justify-center items-center min-h-screen">
                    <span>Your inbox is empty.</span>
                    <span>Connect with sellers to chat</span>
                </div>
            </div> */}
            {/* empty left side ends here */}


            {/* inbox  */}
            <div className="lg:w-1/3 md:w-1/2 w-full bg-blue-200 p-2 min-h-screen rounded-lg">
                <div className="w-full flex justify-center border-b-2 border-black">
                    INBOX
                </div>
                {chats?.length > 0 &&
                    chats.map((chatroom: any) => {
                        // every chatroom contains two users
                        // first we have to show the user which is not currently using
                        const behindUser = chatroom?.users?.find((userDoc: any) => userDoc?._id !== user?._id)
                        return (
                        <div className="w-full flex justify-between h-16 border-b items-center border-black">
                            <div className="flex justify-start gap-2 items-center">
                                <div className="w-10 bg-green-600 h-10 rounded-full">
                                    <img className="object-cover" src={behindUser?.profilePhoto} alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{behindUser?.profilePhoto}</span>
                                    <span>{chatroom?.lastMessage}</span>
                                </div>
                            </div>
                            <span className="bg-purple-600 p-1 rounded-full"> 77</span>
                        </div>
                        )
                    })
                }
            </div>

            {/* if no chat is being selected it will shows in the right side */}
            {/* <div className="lg:w-2/3 md:w-1/2 w-full bg-blue-200 p-4 min-h-screen rounded-lg flex flex-col justify-center items-center">
                <span>Connect with sellers through ep-link</span>
                <span>Get your needs fulfilled</span>
            </div> */}
            {/* empty right side ends here */}

            <div className="lg:w-2/3 md:w-1/2 w-full bg-blue-200 p-4 pt-0 h-screen flex flex-col rounded-lg">
                {/* user name and head */}
                <div className="w-full flex justify-between h-16 mb-1 border-b items-center border-black">
                    <div className="flex justify-start gap-2 items-center">
                        <div className="w-10 bg-green-600 h-10 rounded-full">
                            <img className="object-cover" src="" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">{seller ? seller.userName : 'User'}</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6">
                        <BsCameraVideoFill />
                        <IoIosCall />
                        <GrMore />
                    </div>
                </div>
                {/* user name and head ends here*/}

                {/* messages shows in this div */}
                <div className="flex-grow bg-blue-200 overflow-y-auto">
                    {/* <div className='bg-white p-1 px-2 mb-1 w-fit rounded-md'>message</div> */}
                    {
                        messages?.length && 
                        messages.map((messageDoc: any) => (
                            <div className='bg-white p-1 px-2 mb-1 w-fit rounded-md'>{messageDoc?.message}</div>
                        ))
                    }

                </div>
                {/* message showing div ended here */}

                {/* footer for type message and send */}
                <div className="mb-0 flex items-center p-4">
                    <input
                        ref={inputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type your message..."
                        className="flex-grow bg-white border border-gray-300 p-2 rounded-md mr-2"
                    />
                    <button
                        type='button'
                        onClick={sendMessage}
                        className="bg-slate-900 text-white px-4 py-2 rounded-md">
                        Send
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Chat