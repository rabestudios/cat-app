import { useEffect } from "react";
import socketIOClient from "socket.io-client";

let socket;

const useSocket = endpoint => {
  useEffect(() => {
    if (endpoint) {
      socket = socketIOClient(endpoint);
    }
  }, [endpoint]);

  return socket;
};

export default useSocket;
