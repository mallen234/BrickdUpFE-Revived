import React from "react";
import type { Dispatch, SetStateAction } from "react";
import "./DanyalSlider.css";

interface props {
  roundInput: number;
  setRoundInput: Dispatch<SetStateAction<number>>;
}

export const DanyalsSlider: React.FC<props> = ({
  setRoundInput,
  roundInput,
}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoundInput(Number(event.target.value));
  };

  return (
    <div className="slider-container">
      <p className="slider-text">Round count: {roundInput}</p>
      <input
        type="range"
        min="1"
        max="20"
        step="1"
        value={roundInput}
        onChange={handleSliderChange}
        className="custom-slider"
      />
      <div className="slider-labels">
        <span>1</span>
        <span>20</span>
      </div>
    </div>
  );
};
