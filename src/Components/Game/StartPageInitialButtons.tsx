import React from "react";

interface StartPageInitialButtonsProps {
  setShowLobbyInput: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlayerInput: React.Dispatch<React.SetStateAction<boolean>>;
  setShowGoBackButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRoundInputButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StartPageInitialButtons: React.FC<
  StartPageInitialButtonsProps
> = ({
  setShowLobbyInput,
  setShowPlayerInput,
  setShowGoBackButton,
  setShowRoundInputButton,
}) => {
  const handleStartGame = () => {
    setShowPlayerInput(true);
    setShowLobbyInput(false);
    setShowGoBackButton(true);
    setShowRoundInputButton(true);
  };

  const handleJoinGame = () => {
    setShowPlayerInput(true);
    setShowLobbyInput(true);
    setShowGoBackButton(true);
    setShowRoundInputButton(false);
  };

  return (
    <div className="start-page-button-container">
      <button onClick={handleStartGame} className="start-game-container">
        <span className="start-game-button-text">Start Game</span>
      </button>
      <button onClick={handleJoinGame} className="join-lobby-container">
        <span className="start-game-button-text">Join Game</span>
      </button>
    </div>
  );
};
