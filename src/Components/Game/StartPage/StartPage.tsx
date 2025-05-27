import React, { useState, useEffect, useRef } from "react";
import { usePollingContext } from "../../../context/index.ts";
import { url } from "../../../utils/url.ts";
import { StartPageInitialButtons } from "../StartPageInitialButtons.tsx";
import "./StartPage.css";

interface StartPageProps {}

// Define the PollingState interface to fix TypeScript errors
interface PollingState {
  playerId: string;
  lobbyId: string;
  cookie: string;
  serverCookie: string;
  admin: boolean;
  imageRandomiser: any;
  [key: string]: any; // Allow for additional properties
}

export const StartPage: React.FC<StartPageProps> = () => {
  const redirectRef = useRef(false);
  const { pollingState, setPollingState } = usePollingContext();
  const [playerName, setPlayerName] = useState<string>("");
  const [lobbyCode, setLobbyCode] = useState<string>("");
  const [roundInput, setRoundInput] = useState<number>(1);

  const [playerNameError, setPlayerNameError] = useState(false);
  const [lobbyCodeError, setLobbyCodeError] = useState(false);
  const [roundInputError, setRoundInputError] = useState(false);

  const [showPlayerInput, setShowPlayerInput] = useState<boolean>(false);
  const [showLobbyInput, setShowLobbyInput] = useState<boolean>(false);
  const [showGoBackButton, setShowGoBackButton] = useState<boolean>(false);
  const [showRoundInput, setShowRoundInput] = useState<boolean>(false);

  // Load fonts using web approach
  useEffect(() => {
    // Web font loading can be handled via CSS or a library like Web Font Loader
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/fonts/madimi.css"; // Assuming you have a CSS file for the font
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleStartClick = async () => {
    if (!playerName.trim()) {
      setPlayerNameError(true);
      setLobbyCodeError(false);
      return;
    }

    try {
      const response = await fetch(`${url}/lobby/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName,
          num_rounds: roundInput,
        }),
      });

      const data = await response.json();

      setPollingState((pollingState: PollingState) => ({
        ...pollingState,
        playerId: data.id,
        lobbyId: data.lobbyId,
        cookie: data.cookie,
        serverCookie: data.serverCookie,
        admin: data.admin,
        imageRandomiser: data.imageRandomiser,
      }));

      redirectRef.current = true;
    } catch (error) {
      alert(error);
    }
  };

  const handleJoinClick = async () => {
    if (!playerName.trim()) {
      setPlayerNameError(true);
      setLobbyCodeError(false);
      return;
    } else {
      setPlayerNameError(false);
    }

    try {
      const trimmedLobbyId: string = lobbyCode.trim();
      const response = await fetch(`${url}/lobby/join/${trimmedLobbyId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName: playerName,
        }),
      });

      if (response.status === 404) {
        setLobbyCodeError(true);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setPollingState((pollingState: PollingState) => ({
        ...pollingState,
        playerId: data.id,
        lobbyId: trimmedLobbyId,
        cookie: data.cookie,
        serverCookie: data.serverCookie,
        admin: data.admin,
        imageRandomiser: data.imageRandomiser,
      }));

      redirectRef.current = true;
    } catch (error) {
      setLobbyCodeError(true);
    }
  };

  const handleGoClick = () => {
    if (showLobbyInput) {
      handleJoinClick();
    } else {
      handleStartClick();
    }
  };

  const handleGoBackClick = () => {
    setShowLobbyInput(false);
    setShowPlayerInput(false);
    setShowRoundInput(false);
    setLobbyCodeError(false);
    setPlayerNameError(false);
    setRoundInputError(false);
  };

  useEffect(() => {
    if (redirectRef.current) {
      // Using standard web navigation
      // If you have React Router, you could use navigate instead
      window.location.href = `/game/${pollingState.lobbyId}?playerId=${pollingState.playerId}`;
    }
  }, [pollingState]); // Removed navigate from dependencies

  return (
    <div className="start-page-container">
      <div
        className="start-background"
        style={{ backgroundImage: "url('/assets/Images/bckgrnd1.svg')" }}
      >
        <div className="container">
          <h1 className="title">Brickd Up 🧱</h1>

          {!showPlayerInput && (
            <StartPageInitialButtons
              setShowLobbyInput={setShowLobbyInput}
              setShowPlayerInput={setShowPlayerInput}
              setShowGoBackButton={setShowGoBackButton}
              setShowRoundInputButton={setShowRoundInput}
            />
          )}

          <div className="inputs">
            {showPlayerInput && (
              <div className="input-error">
                <input
                  className={`name-input ${
                    playerNameError ? "error-input" : ""
                  }`}
                  placeholder="Input name"
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
            )}

            {showLobbyInput && (
              <div className="input-error">
                <input
                  className={`name-input ${
                    lobbyCodeError ? "error-input" : ""
                  }`}
                  placeholder="Input Lobby ID here"
                  onChange={(e) => setLobbyCode(e.target.value)}
                />
              </div>
            )}

            {/* {showRoundInput && (
              <DanyalsSlider
                setRoundInput={setRoundInput}
                roundInput={roundInput}
              />
            )} */}

            {showPlayerInput && (
              <div className="go-and-back-buttons">
                <button onClick={handleGoClick} className="go-button">
                  <span className="start-game-button-text">Go</span>
                </button>
                <button onClick={handleGoBackClick} className="go-button">
                  <span className="start-game-button-text">Back</span>
                </button>
              </div>
            )}

            {lobbyCodeError && (
              <p className="error-text">Please enter a valid lobby code❗</p>
            )}

            {playerNameError && (
              <div className="error-container">
                <p className="error-text">Please enter your name❗</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
