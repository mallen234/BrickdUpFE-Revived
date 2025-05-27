import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the PollingState interface
interface PollingState {
  playerId: string;
  lobbyId: string;
  cookie: string;
  serverCookie: string;
  admin: boolean;
  imageRandomiser: any;
  [key: string]: any;
}

// Define the context type
interface PollingContextType {
  pollingState: PollingState;
  setPollingState: React.Dispatch<React.SetStateAction<PollingState>>;
}

// Create the context with default values
const PollingContext = createContext<PollingContextType>({
  pollingState: {
    playerId: "",
    lobbyId: "",
    cookie: "",
    serverCookie: "",
    admin: false,
    imageRandomiser: null,
  },
  setPollingState: () => {},
});

// Create a provider component
export const PollingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pollingState, setPollingState] = useState<PollingState>({
    playerId: "",
    lobbyId: "",
    cookie: "",
    serverCookie: "",
    admin: false,
    imageRandomiser: null,
  });

  return (
    <PollingContext.Provider value={{ pollingState, setPollingState }}>
      {children}
    </PollingContext.Provider>
  );
};

// Create a hook to use the context
export const usePollingContext = () => useContext(PollingContext);
