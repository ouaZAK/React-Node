import React, { useEffect, useState } from "react";
import "../styles/game.css";

const About: React.FC = () => {
  const [i, setI] = useState(1); 
  const [gameOver, setGameOver] = useState(false);
  const [dir, setDir] = useState(true); // direction control (true = forward, false = backward)
  const [lastKeyTime, setLastKeyTime] = useState<number | null>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const keyMap: { [key: string]: number } = { q: 1, w: 2, e: 3, r: 4, t: 5, y: 6 };

  useEffect(() => {
    if (gameOver) return;

    const boxes = Array.from({ length: 6 }, (_, index) => document.querySelector(`.box${index + 1}`))
      .filter(Boolean) as HTMLElement[];

    boxes.forEach((box, index) => {
      box.style.backgroundColor = index + 1 === i ? "green" : "grey";
    });

    let timeout = setTimeout(() => {
      boxes[i - 1].style.backgroundColor = "red"; // Turn red
      setGameOver(true);
    }, 2000); // 2 second to check key press

    return () => clearTimeout(timeout);
  }, [i, gameOver]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameOver) return;

    const pressedKey = event.key.toLowerCase();
    const pressedNumber = keyMap[pressedKey];

    if (pressedNumber === undefined) return; // Ignore invalid keys

    const now = Date.now();

    if (pressedNumber === i) {
      // If the same key is pressed twice within 2 seconds, reverse direction but stay on the same box
      if (lastKey === pressedKey && lastKeyTime && now - lastKeyTime < 2000) {
        setDir((prevDir) => !prevDir); // Reverse direction
        setLastKeyTime(null); // Reset double press timer
        return; // Stay on the same box and wait for the correct key
      }

      setLastKey(pressedKey);
      setLastKeyTime(now);

      // Wait 1 second before moving to the next step
      setTimeout(() => {
        setI((prevI) => {
          let newI = dir ? prevI + 1 : prevI - 1;

          if (newI > 6) {
            newI = 1;
          } else if (newI < 1) {
            newI = 6;
          }

          return newI;
        });
      }, 1000);
    } else {
      setGameOver(true); // Incorrect key pressed
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [i, gameOver, dir, lastKey, lastKeyTime]);

  return (
    <div>
      <h1>Press A-F to match the expected box</h1>
      <div className="box-parent">
        <div className="box1"></div>
        <div className="_2box">
          <div className="box2"></div>
          <div className="box6"></div>
        </div>
        <div className="_2box">
          <div className="box3"></div>
          <div className="box5"></div>
        </div>
        <div className="box4"></div>
      </div>
      {gameOver && <p style={{ color: "red" }}>Game Over! Refresh to Restart</p>}
    </div>
  );
};

export default About;
