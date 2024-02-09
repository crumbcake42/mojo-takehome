import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { SOCKET_URL } from "@/lib/polygonio/types";
import { WS_AUTH_MESSAGE } from "@/lib/polygonio/constants";
import { isAuthSuccessData } from "@/lib/polygonio/helpers";
export const useAuthedWebSocket = (socketUrl: SOCKET_URL) => {
    const { lastMessage, readyState, sendMessage, ...ws } =
        useWebSocket(socketUrl);

    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        setAuthed(false);
    }, [socketUrl]);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && !authed)
            sendMessage(WS_AUTH_MESSAGE);
    }, [authed, readyState]);

    useEffect(() => {
        console.log(
            "readyState",
            {
                [ReadyState.UNINSTANTIATED]: "UNINSTANTIATED",
                [ReadyState.CLOSED]: "CLOSED",
                [ReadyState.CLOSING]: "CLOSING",
                [ReadyState.CONNECTING]: "CONNECTING",
                [ReadyState.OPEN]: "OPEN",
            }[readyState]
        );
    }, [readyState]);

    useEffect(() => {
        const data = JSON.parse(lastMessage?.data || "[{}]")[0];
        if (isAuthSuccessData(data)) setAuthed(true);
    }, [lastMessage]);

    return {
        ...ws,
        lastMessage,
        readyState,
        sendMessage,
        canSubscribe: authed && readyState === ReadyState.OPEN,
    };
};
