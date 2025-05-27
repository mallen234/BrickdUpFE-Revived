import { useState } from "react";
import "./App.css";
import { StartPage } from "./Components/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StartPage />
    </>
  );
}

export default App;
