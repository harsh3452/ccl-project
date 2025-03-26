import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[] | number) => {
  const [call, setCall] = useState<Call | undefined>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) return;

    const loadCall = async () => {
      try {
        let callId = Array.isArray(id) ? id[0] : id; // ✅ Extract first item if it's an array
        if (typeof callId !== "string" && typeof callId !== "number") {
          console.error(`Invalid call ID:`, id);
          setIsCallLoading(false);
          return;
        }

        const { calls } = await client.queryCalls({
          filter_conditions: { id: callId.toString() }, // ✅ Ensure it's a string
        });

        if (calls.length > 0) setCall(calls[0]);
        else setCall(undefined);
      } catch (error) {
        console.error("Error fetching call:", error);
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
