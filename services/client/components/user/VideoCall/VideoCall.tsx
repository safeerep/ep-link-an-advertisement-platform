"use client"
import React, { useEffect, useRef } from 'react'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'


const VideoCall = ({ roomID, callerRoomId, rejectCall }: {roomID: string, callerRoomId: string, rejectCall?: any}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            meeting(containerRef.current);
        }
    }, [roomID]);

    const meeting = async (element: any) => {
        // give your' appid and serverSecret;
        const appID = 954938289;
        const serverSecret = "038030dcd5637db0a420ed6d4e06e9f7";
        const safeRoomID: string = callerRoomId? callerRoomId: roomID;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            safeRoomID,
            Date.now().toString(),
            "ep-private"
            );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
              },
            showPreJoinView: callerRoomId? true: false,
            onLeaveRoom() {
                rejectCall()
            },
        });
    };


    return (
        <div ref={containerRef} className='h-4/5 w-full'></div>
    )
}

export default VideoCall