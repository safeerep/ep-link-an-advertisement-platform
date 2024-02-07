import { GrMore } from 'react-icons/gr'
import { IoIosCall } from 'react-icons/io'
import { BsCameraVideoFill, BsCameraVideo, BsImageAlt } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { GrDocument } from 'react-icons/gr'
import { MdAudiotrack } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    authRequired,
    blockSeller,
    changeRoom,
    getCurrentUserChatRooms,
    reportSeller,
    saveNewMessage,
    unBlockSeller
} from '@/store/actions/userActions/userActions'
import { io } from 'socket.io-client'
import { SOCKET_BASE_URL } from '@/constants'
import toast, { Toaster } from 'react-hot-toast'
import VideoCall from '../VideoCall/VideoCall'
import ConfimationModalWithDialogue from '@/components/Modals/ConfirmationWithDialogue'

const Chat = () => {
    const socket = io(`${SOCKET_BASE_URL}`)
    const dispatch: any = useDispatch();
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isFileAttachDropdownOpen, setIsFileAttachDropdownOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [showTyping, setShowTyping] = useState(false)
    const [videoCallOngoing, setVideoCallOngoing] = useState(false)
    const [initiateCall, setInitiateCall] = useState(false)
    const [callerName, setCallerName] = useState('')
    const [receiverName, setReceiverName] = useState('')
    const [callerId, setCallerId] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [signalData, setSignalData] = useState(null)
    const [newMessages, setNewMessages] = useState<any>([])
    const inputRef = useRef<HTMLInputElement | null>(null)
    const roomId = useSelector((state: any) => state?.user?.data?.chatroom?._id)
    const seller = useSelector((state: any) => state?.user?.data?.seller)
    const messages = useSelector((state: any) => state?.user?.data?.messages)
    const chats = useSelector((state: any) => state?.user?.data?.chats)
    const user: any = useSelector((state: any) => state?.user?.data?.userData)
    const currentUserBlockedReceiver: any = useSelector((state: any) => state?.user?.data?.currentUserBlockedReceiver)
    const unreadMessages: any = useSelector((state: any) => state?.user?.data?.unreadMessages)
    const userId: string = user?._id;

    useEffect(() => {
        socket.emit("join-user-room", userId)
    }, [userId])

    const handleRoomChange = (userId: string) => {
        console.log('clicked for room change');
        dispatch(changeRoom({ userId, currentRoomId: roomId }))
    }

    useEffect(() => {
        dispatch(authRequired(router))
        dispatch(getCurrentUserChatRooms())
        if (roomId) {
            inputRef?.current?.focus()
        }
    }, [])

    useEffect(() => {
        socket.emit("join-room", roomId, user?._id)
        setNewMessages([])
        setMessage('')
    }, [roomId])

    const sendMessage = () => {
        if (!message || currentUserBlockedReceiver) return;
        console.log(`yes message have `, message);
        const messageDoc = {
            message: message,
            chatRoomId: roomId,
            senderId: user?._id
        }
        socket.emit("send-message", messageDoc)
        dispatch(saveNewMessage(messageDoc))
    }

    socket.on("show-message", (data: any) => {
        console.log('----show message received in front end-----------');
        data.showToReceiver = true;
        setNewMessages((newMessages: any) => [...newMessages, data]);
        setMessage('')
        dispatch(saveNewMessage(data))
    })

    socket.on("receiver-blocked", (data: any) => {
        console.log('----receiver-blocked received in front end-----------');
        console.log(data);
        data.showToReceiver = false;
        setNewMessages((newMessages: any) => [...newMessages, data]);
        dispatch(saveNewMessage(data))
    })

    socket.on("typing", ({ chatRoomId, senderId }: { chatRoomId: string, senderId: string }) => {
        if (chatRoomId === roomId && senderId !== user?._id && !currentUserBlockedReceiver) {
            // show typing 
            setShowTyping(true)
            setTimeout(() => {
                setShowTyping(false)
            }, 3000)
        }
    })

    const reportOneUser = (reason: string) => {
        const sellerId: string = seller?._id;
        dispatch(reportSeller({ sellerId, reason: reason }))
        dispatch(blockSeller(sellerId))
        setIsDropdownOpen(false)
    }

    const handleMoreAction = (action: string) => {
        // we will get seller id from state;
        const sellerId = seller?._id;
        if (action === 'block') {
            dispatch(blockSeller(sellerId))
            setIsDropdownOpen(false)
        }
        else {
            dispatch(unBlockSeller(sellerId))
            setIsDropdownOpen(false)
        }
    }

    const inputChanged = (e: any) => {
        setMessage(e.target.value)
        const data = {
            chatRoomId: roomId,
            senderId: user?._id
        }
        if (!currentUserBlockedReceiver) {
            socket.emit("typing", data)
        }
    }

    // this function calls onthe time when user presses video call button
    // at that point of time the chat page will hide and video call page will shows
    const handleVideoCall = () => {
        if (videoCallOngoing) toast.error(`You can't have multiple calls at a time`)
        else {
            setInitiateCall(true)
            setReceiverName(seller ? seller.userName : 'User')
            setCallerId(userId)
            setCallerName(user?.userName)
            setReceiverId(seller?._id)
            setVideoCallOngoing(!videoCallOngoing)
        }
    }

    // its the time when user is active and user getting calls;
    // at that point of time, video call page will shows;
    socket?.on("calling-user", (data: any) => {
        setCallerName(data?.from)
        setCallerId(data.fromUserId)
        setSignalData(data.signalData)
        setVideoCallOngoing(true);
    })

    return (
        !videoCallOngoing ?
            <div className="fixed flex justify-around gap-2 p-4 h-4/5 w-full">
                {/* inbox  */}
                <div className="lg:w-1/3 md:w-1/2 w-full bg-blue-100 p-2 h-full rounded-lg">
                    <div className="w-full flex justify-center border-b-2 border-black">
                        INBOX
                    </div>
                    {chats?.length > 0 ?
                        (chats.map((chatroom: any, index: number) => {
                            // every chatroom contains two users
                            // first we have to show the user which is not currently using
                            const behindUser = chatroom?.users?.find((userDoc: any) => {
                                console.log('okdaa');
                                console.log(userDoc?.userId);
                                console.log(user?._id);
                                console.log('okdaa');
                                if (userDoc?.userId?.userId !== user?._id) {
                                    return userDoc?.userId;
                                }
                            })
                            return (
                                <div
                                    key={behindUser?._id}
                                    className="w-full flex justify-between h-16 border-b items-center border-black cursor-pointer"
                                    onClick={() => handleRoomChange(behindUser?.userId?.userId)}
                                >
                                    <div className="flex justify-start gap-2 items-center">
                                        <div className="w-10 bg-gray-600 h-10 rounded-full">
                                            <img className="object-cover w-full h-full rounded-full" src={behindUser?.userId?.profilePhoto} alt="" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{behindUser?.userId?.userName}</span>
                                            <span>{chatroom?.lastMessage}</span>
                                        </div>
                                    </div>
                                    <span className="bg-purple-300 px-2 rounded-full">{unreadMessages && unreadMessages[index]?.totalUnread > 0 && unreadMessages[index]?.totalUnread}</span>
                                </div>
                            )
                        })) :
                        (<div className="flex flex-col justify-center items-center h-full">
                            <div>Your inbox is empty.</div>
                            <div>Connect with sellers to chat</div>
                        </div>)
                    }
                </div>
                {/* if no chat is being selected it will shows in the right side */}
                {
                    !roomId &&
                    <div className="lg:w-2/3 md:w-1/2 w-full bg-blue-100 p-4 h-full rounded-lg flex flex-col justify-center items-center">
                        <span>Connect with sellers through ep-link</span>
                        <span>Get your needs fulfilled</span>
                    </div>}
                {/* empty right side ends here */}

                {
                    roomId &&
                    <div className="lg:w-2/3 md:w-1/2 w-full bg-blue-100 p-4 pt-0 h-full flex flex-col rounded-lg">
                        {/* user name and head */}
                        <div className="w-full flex justify-between h-16 mb-1 border-b items-center border-black">
                            <div className="flex justify-start gap-2 items-center">
                                <div className="w-10 bg-green-600 h-10 rounded-full">
                                    <img className="object-cover w-full h-full rounded-full" src={seller?.profilePhoto} alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{seller ? seller.userName : 'User'}</span>
                                    {showTyping && <span className='text-green-500'>Typing...</span>}
                                </div>
                            </div>
                            <div className="flex justify-center gap-6">
                                <button
                                    onClick={() => { handleVideoCall() }}
                                    type="button">
                                    <BsCameraVideoFill />
                                </button >
                                <button type="button">
                                    <IoIosCall />
                                </button>
                                <>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <GrMore />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute cursor-pointer top-16 right-10 p-1 z-10 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {currentUserBlockedReceiver ?
                                                <button
                                                    onClick={() => handleMoreAction('un-block')}
                                                    className="block px-4 py-2 text-sm text-black">
                                                    unblock
                                                </button> :
                                                <>
                                                    <button
                                                        onClick={() => handleMoreAction('block')}
                                                        className="block px-4 py-2 text-sm text-black">
                                                        Block user
                                                    </button>
                                                    <button
                                                        onClick={() => setModalOpen(true)}
                                                        className="block px-4 py-2 text-sm text-black">
                                                        Block & Report
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    )}
                                </>
                            </div>
                        </div>
                        {/* user name and head ends here*/}

                        {/* messages shows in this div */}
                        <div className="flex-grow bg-blue-100 overflow-y-auto">
                            {/* <div className='bg-white p-1 px-2 mb-1 w-fit rounded-md'>message</div> */}
                            {
                                messages?.length > 0 &&
                                messages.map((messageDoc: any, index: number) => (
                                    messageDoc.showToReceiver &&
                                    <div key={index}
                                        className={`bg-white p-1 px-2 mb-1 w-fit rounded-md 
                                    ${messageDoc.senderId === user?._id ? 'ml-auto' : ''
                                            }`}
                                    >{messageDoc?.message}</div>
                                ))
                            }
                            {
                                newMessages?.length > 0 &&
                                newMessages.map((messageDoc: any, index: number) => (
                                    messageDoc?.showToReceiver &&
                                    <div key={index}
                                        className={`bg-white p-1 px-2 mb-1 w-fit rounded-md 
                                ${messageDoc.senderId === user?._id ? 'ml-auto' : ''
                                            }`}
                                    >{messageDoc?.message}</div>
                                ))
                            }
                            {
                                currentUserBlockedReceiver &&
                                <div className={`bg-slate-200 border border-black  p-1 px-2 mb-1 w-fit rounded-md text-center mx-auto`}
                                >unblock first to send messages</div>
                            }

                        </div>
                        {/* message showing div ended here */}

                        {/* footer for type message and send */}
                        <div className="mb-0 flex items-center p-4">
                            <input
                                ref={inputRef}
                                value={message}
                                onChange={(e) => inputChanged(e)}
                                type="text"
                                placeholder="Type your message..."
                                className="flex-grow bg-white border border-gray-300 p-2 rounded-md mr-2"
                            />
                            {/* starting */}
                            <button
                                type='button'
                                onClick={() => setIsFileAttachDropdownOpen(!isFileAttachDropdownOpen)}
                                className="bg-slate-700 text-white mx-1 px-4 py-2 rounded-md relative">
                                < AiOutlinePlus className='text-2xl' />
                            </button>
                            {isFileAttachDropdownOpen && (
                                <div className="absolute flex cursor-pointer bottom-24 right-10 p-1 z-10 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none gap-12">
                                <div className="relative inline-block">
                                  <input
                                    type="file"
                                    id="videoInput"
                                    accept="video/*"
                                    multiple
                                    hidden
                                  />
                                  <label htmlFor="videoInput" className="cursor-pointer">
                                    <BsCameraVideo className="w-6 h-6" />
                                  </label>
                                </div>
                                <div className="relative inline-block">
                                  <input
                                    type="file"
                                    id="imageInput"
                                    accept="image/*"
                                    multiple
                                    hidden
                                  />
                                  <label htmlFor="imageInput" className="cursor-pointer">
                                    <BsImageAlt className="w-6 h-6" />
                                  </label>
                                </div>
                                <div className="relative inline-block">
                                  <input
                                    type="file"
                                    id="documentInput"
                                    accept=".pdf, .doc, .docx"
                                    multiple
                                    hidden
                                  />
                                  <label htmlFor="documentInput" className="cursor-pointer">
                                    <GrDocument className="w-6 h-6" />
                                  </label>
                                </div>
                                <div className="relative inline-block">
                                  <input
                                    type="file"
                                    id="audioInput"
                                    accept="audio/*"
                                    multiple
                                    hidden
                                  />
                                  <label htmlFor="audioInput" className="cursor-pointer">
                                    <MdAudiotrack className="w-6 h-6" />
                                  </label>
                                </div>
                              </div>
                            )}

                            {/* ending for file attach button */}
                            <button
                                type='button'
                                onClick={sendMessage}
                                className="bg-slate-900 text-white px-4 py-2 rounded-md">
                                Send
                            </button>
                        </div>
                    </div>}
                <Toaster />
                <ConfimationModalWithDialogue
                    afterConfirmation={reportOneUser}
                    isModalOpen={modalOpen}
                    notesHead='Write a reason for report'
                    setModalOpen={setModalOpen}
                />
            </div> :
            <VideoCall
                fromUserId={callerId}
                videoCallOngoing={videoCallOngoing}
                endVideoCall={setVideoCallOngoing}
                receiverName={receiverName}
                setReceiverName={setReceiverName}
                callerName={callerName}
                setCallerName={setCallerName}
                to={receiverId}
                startCall={initiateCall}
                signal={signalData}
                chatPageSocket={socket}
            />
    )
}

export default Chat