import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Peer, { SignalData } from 'simple-peer'
import { SOCKET_BASE_URL } from '@/constants'
import { MdCallEnd } from 'react-icons/md'
import { FiVideo } from 'react-icons/fi'
import { FiVideoOff } from 'react-icons/fi'
import { BiMicrophone } from 'react-icons/bi'
import { BiMicrophoneOff } from 'react-icons/bi'

const VideoCall = () => {
    const socket = io(`${SOCKET_BASE_URL}`)
    const receiverVideo = useRef<HTMLVideoElement | any>(null);
    const currentUserVideo = useRef<HTMLVideoElement | any>(null);
    const connection = useRef<any>(null);
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [microPhoneButton, setMicroPhoneButton] = useState(true)
    const [videoButton, setVideoButton] = useState(true)

    const [stream, setStream] = useState<MediaStream | undefined>();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream: MediaStream) => {
                setStream(currentStream);
                currentUserVideo.current.srcObject = currentStream;
            })
            .catch((err) => {
                console.log(`something went wrong during taking camera and mic on ${err}`);
            })
    }, [])

    const callUser = () => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        })

        peer.on('signal', (signalData: SignalData) => {
            socket.emit('call-user', ({
                from: "userId",
                to: "receiverId",
                signalData,
                callerName: "currentuser name"
            }))
        })

        peer.on('stream', (currentStream) => {
            receiverVideo.current.srcObject = currentStream;
        })

        socket.on('call-accepted', (signalData: SignalData) => {
            setCallAccepted(true)
            peer.signal(signalData)
        })

        connection.current = peer;
    }

    const acceptIncomingCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        })

        peer.on('signal', (signalData: SignalData) => {
            socket.emit('answer-call', ({ signalData, from: 'someone', }))
        })

        peer.on('stream', (currentStream: any) => {
            receiverVideo.current.srcObject = currentStream;
        })

        peer.signal('call.signal')

        connection.current = peer;
    }

    const rejectIncomingCall = () => {
        setCallEnded(true)
        connection.current.destroy()
    }

    const toggleVideo = () => {
        const videoTrack = stream?.getVideoTracks()[0];

        if (videoTrack) {
            setVideoButton(!videoButton)
            videoTrack.enabled = !videoTrack.enabled;
        }
    }

    const toggleAudio = () => {
        const audioTrack = stream?.getAudioTracks()[0];

        if (audioTrack) {
            setMicroPhoneButton(!microPhoneButton)
            audioTrack.enabled = !audioTrack.enabled;
        }
    }

    return (
        <div className='w-full h-screen relative'>
            {/* receiver visuals will shoes here in full screen */}
            <div className='w-full h-full relative'>
                <video autoPlay muted className="w-full bg-blue-500 h-full" ref={receiverVideo} src=""></video>
            </div>
            {/* current user screen, it will initially take 1/2 height and 1/3 width only */}
            <div className='absolute top-0 right-0 w-1/2  h-1/2 '>
                <video autoPlay muted className="w-full h-full" ref={currentUserVideo} src=""></video>
            </div>
            <div className="absolute bottom-20 w-full flex justify-center ">
                <div className="flex justify-around bg-white w-72 h-20 rounded-sm">
                    <button
                        onClick={toggleAudio}
                        type="button"
                    >
                        {
                            microPhoneButton ?
                                < BiMicrophoneOff /> :
                                <BiMicrophone />
                        }
                    </button>
                    <button
                        onClick={rejectIncomingCall}
                        type="button"
                    >
                        < MdCallEnd />
                    </button>
                    <button
                        onClick={toggleVideo}
                        type="button"
                    >
                        {
                            videoButton ?
                                < FiVideoOff /> :
                                <FiVideo />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoCall