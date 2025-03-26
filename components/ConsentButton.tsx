import React from "react";
import {
    CancelCallButton,
    SpeakingWhileMutedNotification,
    ToggleAudioPublishingButton,
    ToggleVideoPublishingButton,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import CallRecord from "./CallRecord";

const ConsentButton = () => {
    const router = useRouter();
    return (
        <div className="str-video__call-controls">
            <SpeakingWhileMutedNotification>
                <ToggleAudioPublishingButton />
            </SpeakingWhileMutedNotification>
            <ToggleVideoPublishingButton />
            <CancelCallButton
                onLeave={() => {
                    router.push("/");
                }}
            />
            <CallRecord />
        </div>
    );
}

export default ConsentButton
