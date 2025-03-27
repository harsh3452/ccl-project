import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const CallRecord = () => {
  const call = useCall();
  const { useLocalParticipant, useIsCallRecordingInProgress, useParticipants } =
    useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isRecording = useIsCallRecordingInProgress();
  const participants = useParticipants();
  const [showDialog, setShowDialog] = useState(false);
  const [consentResponses, setConsentResponses] = useState<{
    [key: string]: boolean;
  }>({});

  // 🔹 Request recording (only if not already recording)
  const requestRecording = async () => {
    if (!call) return;

    // If already recording, stop it immediately
    if (isRecording) {
      await call.stopRecording();
      return;
    }

    // If not recording, request consent from participants
    await call.sendCustomEvent({
      type: "recording-request",
      payload: { requestedBy: localParticipant?.userId },
    });

    setConsentResponses({}); // Reset previous responses
  };

  // 🔹 Listen for recording request event (shows pop-up for all)
  useEffect(() => {
    if (!call) return;

    const handleRecordingRequest = (event: any) => {
      if (event.custom.type === "recording-request") {
        setShowDialog(true);
      }
    };

    call.on("custom", handleRecordingRequest);
    return () => {
      call.off("custom", handleRecordingRequest);
    };
  }, [call]);

  // 🔹 Handle user consent (send response event)
  const handleConsentResponse = async (consent: boolean) => {
    setShowDialog(false);

    await call.sendCustomEvent({
      type: "recording-consent-response",
      payload: { userId: localParticipant?.userId, consent },
    });
  };

  // 🔹 Listen for all participants' consent responses
  useEffect(() => {
    if (!call) return;

    const handleConsentEvent = (event: any) => {
      if (event.custom.type === "recording-consent-response") {
        const { userId, consent } = event.custom.payload;

        setConsentResponses((prev) => ({
          ...prev,
          [userId]: consent,
        }));
      }
    };

    call.on("custom", handleConsentEvent);
    return () => {
      call.off("custom", handleConsentEvent);
    };
  }, [call]);

  // 🔹 Automatically start recording if ALL participants consent
  useEffect(() => {
    const totalParticipants = Object.keys(participants).length;
    const consentedUsers =
      Object.values(consentResponses).filter(Boolean).length;

    if (totalParticipants > 0 && consentedUsers === totalParticipants) {
      call.startRecording();
    }
  }, [consentResponses, call, participants]);

  return (
    <>
      <Button
        className={isRecording ? "bg-red-500" : "bg-gray-200"}
        onClick={requestRecording}
      >
        <Image
          src={
            isRecording ? "/icons/rec-button.png" : "/icons/record-button1.png"
          }
          height={30}
          width={30}
          alt="record-button"
        />
      </Button>
      <AlertDialog open={showDialog}>
        <AlertDialogContent className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg">
          {/* 🔴 Header with Warning Icon */}
          <AlertDialogHeader className="bg-red-600 text-white p-4 rounded-t-lg">
            <AlertDialogTitle className="text-lg font-bold">
              ⚠️ Recording Notice
            </AlertDialogTitle>
          </AlertDialogHeader>

          {/* 🔹 Description Section */}
          <AlertDialogDescription className="p-4 text-gray-300">
            This meeting will be recorded. Do you consent?
          </AlertDialogDescription>

          {/* ✅ Buttons with Color Styling */}
          <AlertDialogFooter className="p-4 flex justify-between">
            <AlertDialogCancel
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg"
              onClick={() => handleConsentResponse(false)}
            >
              ❌ No, I Decline
            </AlertDialogCancel>

            <AlertDialogAction
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
              onClick={() => handleConsentResponse(true)}
            >
              ✅ Yes, I Consent
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CallRecord;
