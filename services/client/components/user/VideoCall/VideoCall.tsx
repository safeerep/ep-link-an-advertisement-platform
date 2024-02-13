"use client"
import React, { useEffect, useRef } from 'react'

const VideoCall = ({ roomID, callerRoomId, rejectCall, currentUserName, callTo = '', data }:
    { roomID: string, callerRoomId: string, rejectCall?: any, currentUserName?: string, callTo?: string, data?: any }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            meeting(containerRef.current);
        }
    }, [roomID]);

    const meeting = async (element: any) => {
        if (typeof window !== 'undefined') {
            try {
                const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');
                const appID = 954938289;
                const serverSecret = "038030dcd5637db0a420ed6d4e06e9f7";
                const safeRoomID: string = callerRoomId ? callerRoomId : roomID;
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    safeRoomID,
                    Date.now().toString(),
                    currentUserName
                );
                const zp = ZegoUIKitPrebuilt.create(kitToken);
                // zp.addPlugins({ ZIM })
        
                zp.joinRoom({
                    container: element,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.OneONoneCall
                    },
                    showPreJoinView: false,
                    onLeaveRoom() {
                        rejectCall(data)
                    },
                    onReturnToHomeScreenClicked() {
                        rejectCall(data)
                    },
        
                });
            } catch (error) {
                alert(`something went wrong during importing ui kit zego`)
            }
        } else {
            alert(`we can't use ui kit in ssr`);
        }

    };


    return (
        <div ref={containerRef} className='h-3/4 w-full'></div>
    )
}

export default VideoCall;