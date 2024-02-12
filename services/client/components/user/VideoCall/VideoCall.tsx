import React, { useEffect, useRef, useState } from 'react'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = ({ roomID }: {roomID: string}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            meeting(containerRef.current);
        }
    }, [roomID]);

    const meeting = async (element: any) => {
        // give your' appid and serverSecret;
        const appID = 777777777;
        const serverSecret = "ep' private ";
        const safeRoomID: string = roomID ?? "";
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
                // Use one-to-one call mode if available
                mode: ZegoUIKitPrebuilt.VideoConference,
              },
        });
    };


    return (
        <div ref={containerRef} className='h-full w-full'></div>
    )
}

export default VideoCall