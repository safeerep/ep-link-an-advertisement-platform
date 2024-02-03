import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Peer, { SignalData } from 'simple-peer'
import { SOCKET_BASE_URL } from '@/constants'
import { MdCallEnd } from 'react-icons/md'
import { FiVideo } from 'react-icons/fi'
import { FiVideoOff } from 'react-icons/fi'
import { BiMicrophone } from 'react-icons/bi'
import { BiMicrophoneOff } from 'react-icons/bi'

const VideoCall = (
    {
        to,
        from,
        fromUserId,
        endVideoCall,
        videoCallOngoing,
        callerName,
        setCallerName,
        receiverName,
        setReceiverName,
        startCall = false,
        signal,
        chatPageSocket,
    }:
        {
            to?: string,
            endVideoCall?: any,
            videoCallOngoing?: boolean,
            from?: string,
            fromUserId?: string,
            setCallerName?: any,
            callerName?: string,
            receiverName: string,
            setReceiverName: any,
            startCall?: boolean,
            signal: any,
            chatPageSocket: any
        }) => {
    const socket = chatPageSocket;
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

        if (startCall) (
            callUser({ to, fromUserId })
        )
    }, [])

    const callUser = ({ to, fromUserId }: { to?: string, fromUserId?: string }) => {
        console.log(`called start call`);

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        })

        socket?.on('receiver-accepted', (signalData: SignalData) => {
            console.log(`yes we got offer answer in video call page `);
            console.log(signalData);
            setCallAccepted(true)
            peer.signal(signalData);
        });

        socket?.on('call-rejected', (signalData: SignalData) => {
            console.log(` in call rejected`);
            setCallAccepted(false)
            peer.signal(signalData)
        })

        peer.on('signal', (signalData: SignalData) => {
            console.log(`in peer.on signal`);
            console.log(signalData);

            socket.emit('call-user', ({
                from: callerName,
                fromUserId,
                to: to,
                signalData,
            }))
        })

        peer.on('connect', () => {
            console.log(`peer connected from call user`);
        })

        peer.on('icecandidate', () => {
            console.log(`in call user icecandidate`);

        })

        peer.on('error', (err) => {
            console.log(`error from call user`, err);
        })

        peer.on('stream', (currentStream) => {
            console.log('in call user stream');
            receiverVideo.current.srcObject = currentStream;
        })

        connection.current = peer;
    }

    const acceptIncomingCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        })
        peer.signal(signal)
        let answerReceived = false;
        peer.on('signal', (signalData: SignalData) => {
            // peer.signal(signalData)
            if (signalData.type === 'answer' && !answerReceived) {
                console.log(`its type is answer`);
                console.log(peer);
                answerReceived = true;
                socket.emit('call-accepted', ({ signalData, to: fromUserId }))
            }
            else {
                console.log(`its not in the type of answer`);
            }
        })
        
        peer.on('connect', () => {
            console.log(`peer connected from accepting incoming call`);
        })

        peer.on('stream', (currentStream) => {
            console.log('in call user stream');
            receiverVideo.current.srcObject = currentStream;
        });

        peer.on('error', (err) => {
            console.log(`error from accepting incoming`, err);
        })

        peer.on('close', () => {
            console.log(`peer connection closed;`);
            endVideoCall(true)
        })

        connection.current = peer;
    }

    const rejectIncomingCall = async () => {
        console.log(`called to cut call`);
        if (stream) {
            const videoTrack = stream?.getVideoTracks()[0];
            const audioTrack = stream?.getAudioTracks()[0];
            // Stop all tracks in the MediaStream
            // if (videoTrack) {
            //     videoTrack.enabled = !videoTrack.enabled;
            // }
            // if (audioTrack) {
            //     audioTrack.enabled = !audioTrack.enabled;
            // }
            await stream?.getTracks()?.forEach(async (track) => track.stop())
        }
        endVideoCall(false)
        setCallEnded(true)
        setCallerName('')
        setReceiverName('')
        connection.current?.destroy()
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
        videoCallOngoing &&
        <div className='w-full h-screen relative'>
            {/* receiver visuals will shoes here in full screen */}
            <div className='w-full h-full relative bg-black'>
                {receiverVideo && <video autoPlay muted className={`bg-black h-full w-full`} ref={receiverVideo}></video>}
            </div>
            {/* current user screen, initially takes 1/2 height and 1/3 width only */}
            <div className={`absolute top-0 right-0 w-1/2 h-1/2`}>
                <video autoPlay muted className={`w-full h-full`} ref={currentUserVideo}></video>
            </div>
            {/* to showname */}
            <div className='absolute top-20 w-full flex justify-center text-center text-white font-bold'>
                {(callerName && receiverName) ? 'calling ' + receiverName : callerName + ' is calling'}
            </div>
            {/* showing name ends here */}
            <div className="absolute bottom-20 w-full flex justify-center ">
                {
                    (callAccepted &&
                        !callEnded) ?
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
                        :
                        (callerName && receiverName) ?
                            <div
                                onClick={rejectIncomingCall}
                                className="flex justify-around bg-red-700 w-28 h-10 rounded-sm">
                                <button
                                    type="button"
                                >
                                    < MdCallEnd />
                                </button>
                            </div> :
                            <div className='flex justify-center gap-2'>
                                <div
                                    onClick={rejectIncomingCall}
                                    className="flex justify-around bg-red-700 w-28 h-10 rounded-sm">
                                    <button
                                    >
                                        < MdCallEnd />
                                    </button>
                                </div>
                                <div className="flex justify-around bg-green-700 w-28 h-10 rounded-sm">
                                    <button
                                        onClick={acceptIncomingCall}
                                    >
                                        < MdCallEnd />
                                    </button>
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default VideoCall