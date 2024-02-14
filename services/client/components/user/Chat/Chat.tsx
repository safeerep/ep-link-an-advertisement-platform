"use client"
import { GrMore, GrEmoji, GrDocument } from 'react-icons/gr'
import { IoIosCall } from 'react-icons/io'
import { BsCameraVideoFill, BsCameraVideo, BsImageAlt } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdAudiotrack } from 'react-icons/md'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    authRequired,
    blockSeller,
    changeMessageStatusAsRead,
    changeRoom,
    getCurrentUserChatRooms,
    reportSeller,
    saveNewMessage,
    sendMediaFilesAsMessage,
    unBlockSeller
} from '@/store/actions/userActions/userActions'
import { io } from 'socket.io-client'
import { SOCKET_BASE_URL } from '@/constants'
import toast, { Toaster } from 'react-hot-toast'
import VideoCall from '../VideoCall/VideoCall'
import ConfimationModalWithDialogue from '@/components/Modals/ConfirmationWithDialogue'
import ShowAttachments from '@/components/Modals/showAttachments'
import { AppDispatch, RootState } from '@/store/store'
import { User } from '@/types/user'
import IncomingCallModal from '@/components/Modals/IncomingCallModal'

const Chat = () => {
    const socket = io(`${SOCKET_BASE_URL}`)
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter()
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [message, setMessage] = useState('')
    const [dataFromIncomingCall, setDataFromIncomingCall] = useState(null)
    const [ringtone, setRingtone] = useState<HTMLAudioElement | null>(null);
    const [showEmojis, setShowEmojis] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isFileAttachDropdownOpen, setIsFileAttachDropdownOpen] = useState(false)
    const [incomingCallModalOpen, setIncomingCallModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [showTyping, setShowTyping] = useState(false)
    const [videoCallOngoing, setVideoCallOngoing] = useState(false)
    const [incomingCallOn, setIncomingCallOn] = useState('')
    const [prevRoom, setPrevRoom] = useState('')
    const [newMessages, setNewMessages] = useState<any>([])
    const inputRef = useRef<HTMLInputElement | null>(null)
    const roomId = useSelector((state: RootState) => state?.user?.data?.chatroom?._id)
    const seller = useSelector((state: RootState) => state?.user?.data?.seller)
    const messages = useSelector((state: RootState) => state?.user?.data?.messages)
    const chats = useSelector((state: RootState) => state?.user?.data?.chats)
    const user: User = useSelector((state: RootState) => state?.user?.data?.userData)
    const currentUserBlockedReceiver: any = useSelector((state: RootState) => state?.user?.data?.currentUserBlockedReceiver)
    const unreadMessages: any = useSelector((state: RootState) => state?.user?.data?.unreadMessages)
    const userId: string = user?._id;

    const [showAttachments, setShowAttachments] = useState(false);
    const [currentlySelectedAttachments, setCurrentlySelectedAttachments] = useState<any>(null);
    const [currentlySelectedAttachmentType, setCurrentlySelectedAttachmentType] = useState<string>('');

    useEffect(() => {
        socket.emit("join-user-room", userId)
    }, [userId])

    const handleRoomChange = (userId: string) => {
        setPrevRoom(roomId)
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

    const scrollToBottom = () => {
        if (scrollContainerRef?.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        socket.emit("join-room", prevRoom, roomId, user?._id)
        setNewMessages([])
        setMessage('')
        scrollToBottom()
    }, [roomId, dispatch])

    const sendMessage = () => {
        if (!message || currentUserBlockedReceiver) return;
        console.log(`yes message have `, message);
        const messageDoc = {
            typeOfMessage: 'text',
            message: message,
            chatRoomId: roomId,
            senderId: user?._id,
            receiverId: seller?._id
        }
        setMessage('')
        socket.emit("send-message", messageDoc)
    }

    socket.on("show-message", (data: any) => {
        console.log('----show message received in front end-----------');
        data.showToReceiver = true;
        setNewMessages((newMessages: any) => [...newMessages, data]);
        scrollToBottom()
        if ( data.senderId === user?._id) {
            dispatch(saveNewMessage(data))
        }
    })

    socket.on("receiver-blocked", (data: any) => {
        console.log('----receiver-blocked received in front end-----------');
        console.log(data);
        data.showToReceiver = false;
        setNewMessages((newMessages: any) => [...newMessages, data]);
        dispatch(saveNewMessage(data))
    })

    socket.on("show-notification", (data: any) => {
        if (roomId !== data.chatRoomId && userId !== data.senderId) {
            dispatch(getCurrentUserChatRooms())
        }
        else if ( roomId === data.chatRoomId) {
            changeMessageStatusAsRead({roomId, userId: user?._id})
        }
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
        setModalOpen(false)
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

    // call related socket events starting;

    // this function calls onthe time when user presses video call button
    // at that point of time the chat page will hide and video call page will shows
    const handleVideoCall = () => {
        setVideoCallOngoing(true)
        socket.emit('call-user', ({
            from: user?.userName,
            fromUserId: user?._id,
            to: seller?._id,
            roomId: roomId
        }))
    }

    useEffect(() => {
        const ringtone = new Audio('ringtone.mp3')
        setRingtone(ringtone)
    }, [])
    // its the time when user is active and user getting calls;
    // at that point of time, video call page will shows;
    
    socket?.on("calling-user", (data: any) => {
        setDataFromIncomingCall(data)
        setIncomingCallModalOpen(!incomingCallModalOpen)
        if (ringtone) {
            ringtone.play()
        }
    })

    // event from backend on when receiver declined
    socket?.on("receiver-declined", (data: any) => {
        console.log('yes receiver declined');
        
        setVideoCallOngoing(false)
        window.location.reload()
    })
    
    // on call end;
    socket?.on("call-ended", (data: any) => {
        setVideoCallOngoing(false)
        if (data.fromUserId === user?._id) {
            window.location.reload()
        }
    })
    
    // after accepting incoming calls;
    const incomingCallAccepted = (data: any) => {
        setIncomingCallModalOpen(!incomingCallModalOpen)
        setVideoCallOngoing(true)
        setIncomingCallOn(data.roomId)
        if (ringtone) {
            ringtone.pause();
            ringtone.currentTime = 0;
        }
    }
    
    // after declining incoming calls;
    const incomingCallDeclined = (data: any) => {
        setIncomingCallModalOpen(false)
        socket.emit("call-declined", data)
        router.push('/chat')
        if (ringtone) {
            ringtone.pause();
            ringtone.currentTime = 0;
        }
    }

    // after clicking button for end call;
    const endCall = (data: any) => {
        console.log('called for call end');
        setVideoCallOngoing(false)
        socket.emit("call-ended", data)
    }

    // call related socket events ended here;

    const handleAttachmentChanges = (event: any, fileType: string) => {
        const files = event.target.files;
        const filesArray = (Array.from(files));
        switch (fileType) {
            case 'video':
                setCurrentlySelectedAttachments(filesArray)
                setCurrentlySelectedAttachmentType('video')
                setShowAttachments(true)
                setIsFileAttachDropdownOpen(false)
                break;
            case 'image':
                setCurrentlySelectedAttachments(filesArray)
                setCurrentlySelectedAttachmentType('image')
                setShowAttachments(true)
                setIsFileAttachDropdownOpen(false)
                break;
            case 'document':
                setCurrentlySelectedAttachments(filesArray)
                setCurrentlySelectedAttachmentType('document')
                setShowAttachments(true)
                setIsFileAttachDropdownOpen(false)
                break;
            case 'audio':
                setCurrentlySelectedAttachments(filesArray)
                setCurrentlySelectedAttachmentType('audio')
                setShowAttachments(true)
                setIsFileAttachDropdownOpen(false)
                break;
            default:
                break;
        }
    }

    const sendMediaFiles = async () => {
        if (currentUserBlockedReceiver) {
            toast.error('unblock first to continue')
            return;
        }
        else {
            const docToSend = {
                files: currentlySelectedAttachments,
                typeOfMessage: currentlySelectedAttachmentType,
                chatRoomId: roomId,
                senderId: user?._id
            }
            const files = await sendMediaFilesAsMessage(docToSend);
            setShowAttachments(false)

            files?.forEach((file: string) => {
                const messageDoc = {
                    typeOfMessage: currentlySelectedAttachmentType,
                    message: file,
                    chatRoomId: roomId,
                    senderId: user?._id,
                    receiverId: seller?._id
                }
                socket.emit("send-message", messageDoc)
            })
        }

    }

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
                        <div className="flex-grow bg-blue-100 overflow-y-auto" ref={scrollContainerRef}>
                            {/* <div className='bg-white p-1 px-2 mb-1 w-fit rounded-md'>message</div> */}
                            {
                                messages?.length > 0 &&
                                messages.map((messageDoc: any, index: number) => (
                                    ((messageDoc.showToReceiver &&
                                        user?._id !== messageDoc.senderId) || user?._id === messageDoc.senderId
                                    ) &&
                                    <div key={index}
                                        className={`bg-white p-1 px-2 mb-1 w-fit rounded-md ${messageDoc.senderId === user?._id ?
                                            'ml-auto' : ''}`}
                                    >
                                        {messageDoc.typeOfMessage === 'text' && (
                                            <div className='max-w-2/3'>{messageDoc?.message}</div>
                                        )}
                                        {messageDoc.typeOfMessage === 'image' && (
                                            <img className='max-w-2/3' src={messageDoc?.message} alt="Image" />
                                        )}
                                        {messageDoc.typeOfMessage === 'video' && (
                                            <video controls width="300" className='max-w-2/3'>
                                                <source src={messageDoc?.message} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {messageDoc.typeOfMessage === 'audio' && (
                                            <audio controls className='max-w-2/3'>
                                                <source src={messageDoc?.message} type="audio/mp3" />
                                                Your browser does not support the audio tag.
                                            </audio>
                                        )}
                                        {messageDoc.typeOfMessage === 'document' && (
                                            <div className="flex items-center max-w-2/3">
                                                <GrDocument className="w-6 h-6 mr-2" />
                                                <a href={messageDoc?.message} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {messageDoc.documentName || "Download Document"}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                            {
                                newMessages?.length > 0 &&
                                newMessages.map((messageDoc: any, index: number) => (
                                    ((messageDoc.showToReceiver &&
                                        user?._id !== messageDoc.senderId) || user?._id === messageDoc.senderId
                                    ) &&
                                    <div key={index}
                                        className={`bg-white p-1 px-2 mb-1 w-fit rounded-md ${messageDoc.senderId === user?._id ?
                                            'ml-auto' : ''}`}
                                    >
                                        {messageDoc.typeOfMessage === 'text' && (
                                            <div className='max-w-2/3'>{messageDoc?.message}</div>
                                        )}
                                        {messageDoc.typeOfMessage === 'image' && (
                                            <img className='max-w-2/3' src={messageDoc?.message} alt="Image" />
                                        )}
                                        {messageDoc.typeOfMessage === 'video' && (
                                            <video className='max-w-2/3' controls width="300">
                                                <source src={messageDoc?.message} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {messageDoc.typeOfMessage === 'audio' && (
                                            <audio controls className='max-w-2/3'>
                                                <source src={messageDoc?.message} type="audio/mp3" />
                                                Your browser does not support the audio tag.
                                            </audio>
                                        )}
                                        {messageDoc.typeOfMessage === 'document' && (
                                            <div className="flex items-center max-w-2/3">
                                                <GrDocument className="w-6 h-6 mr-2" />
                                                <a href={messageDoc?.message} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {messageDoc.documentName || "Download Document"}
                                                </a>
                                            </div>
                                        )}
                                    </div>
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
                        <div className="mb-0 w-full flex items-center p-4">
                            <input
                                ref={inputRef}
                                value={message}
                                onChange={(e) => inputChanged(e)}
                                type="text"
                                placeholder="Type your message..."
                                className="flex-grow bg-white border border-gray-300 p-2 rounded-md"
                            />
                            {/* starting of emoji picker */}
                            <button
                                type='button'
                                onClick={() => setShowEmojis(!showEmojis)}
                                className="bg-slate-700 text-white mx-1 px-4 py-2 rounded-md relative">
                                < GrEmoji className='text-2xl' />
                            </button>
                            {
                                showEmojis &&
                                <div className="absolute flex cursor-pointer bottom-24 right-10 p-1 z-10 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={(e: any) => {
                                            const sym = e.unified.split("_");
                                            let codeArray: any = []
                                            sym.forEach((el: any) => {
                                                codeArray.push("0x" + el)
                                            })
                                            let emoji = String.fromCodePoint(...codeArray)
                                            setMessage(message + emoji)
                                        }}
                                    />
                                </div>
                            }
                            {/* ending of emoji picker */}
                            {/* starting */}
                            <button
                                type='button'
                                onClick={() => setIsFileAttachDropdownOpen(!isFileAttachDropdownOpen)}
                                className="bg-slate-700 text-white mx-1 px-4 py-2 rounded-md relative">
                                < AiOutlinePlus className='text-2xl' />
                            </button>
                            {/* starting */}
                            {isFileAttachDropdownOpen && (
                                <div className="absolute flex cursor-pointer bottom-24 right-10 p-1 z-10 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="relative inline-block p-4">
                                        <input
                                            type="file"
                                            id="videoInput"
                                            accept="video/*"
                                            multiple
                                            hidden
                                            onChange={(e) => handleAttachmentChanges(e, 'video')}
                                        />
                                        <label htmlFor="videoInput" className="cursor-pointer flex flex-col items-center">
                                            <BsCameraVideo className="w-6 h-6" />
                                            video
                                        </label>
                                    </div>
                                    <div className="relative inline-block p-4">
                                        <input
                                            type="file"
                                            id="imageInput"
                                            accept="image/*"
                                            multiple
                                            hidden
                                            onChange={(e) => handleAttachmentChanges(e, 'image')}
                                        />
                                        <label htmlFor="imageInput" className="cursor-pointer flex flex-col items-center">
                                            <BsImageAlt className="w-6 h-6" />
                                            image
                                        </label>
                                    </div>
                                    <div className="relative inline-block p-4">
                                        <input
                                            type="file"
                                            id="documentInput"
                                            accept=".pdf, .doc, .docx"
                                            multiple
                                            hidden
                                            onChange={(e) => handleAttachmentChanges(e, 'document')}
                                        />
                                        <label htmlFor="documentInput" className="cursor-pointer flex flex-col items-center">
                                            <GrDocument className="w-6 h-6" />
                                            files
                                        </label>
                                    </div>
                                    <div className="relative inline-block p-4">
                                        <input
                                            type="file"
                                            id="audioInput"
                                            accept="audio/*"
                                            multiple
                                            hidden
                                            onChange={(e) => handleAttachmentChanges(e, 'audio')}
                                        />
                                        <label htmlFor="audioInput" className="cursor-pointer flex flex-col items-center">
                                            <MdAudiotrack className="w-6 h-6" />
                                            audio
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* ending for file attach button */}
                            <button
                                type='button'
                                onClick={() => sendMessage()}
                                className="bg-slate-900 text-white px-4 py-2 rounded-md">
                                Send
                            </button>
                        </div>
                    </div>}
                <Toaster />
                <IncomingCallModal
                    data={dataFromIncomingCall}
                    afterAccepting={incomingCallAccepted}
                    afterDeclining={incomingCallDeclined}
                    isModalOpen={incomingCallModalOpen}
                    setModalOpen={setIncomingCallModalOpen}
                />
                <ConfimationModalWithDialogue
                    afterConfirmation={reportOneUser}
                    isModalOpen={modalOpen}
                    notesHead='Write a reason for report'
                    setModalOpen={setModalOpen}
                />
                <ShowAttachments
                    isModalOpen={showAttachments}
                    setModalOpen={setShowAttachments}
                    afterConfirmation={sendMediaFiles}
                    files={currentlySelectedAttachments}
                    fileType={currentlySelectedAttachmentType}
                />
            </div> :
            (
                videoCallOngoing &&
                <VideoCall 
                roomID={roomId} 
                callerRoomId={incomingCallOn} 
                rejectCall={endCall} 
                currentUserName={user?.userName} 
                callTo={seller?.userName} 
                data={dataFromIncomingCall}
                />
            )
    )
}

export default Chat;