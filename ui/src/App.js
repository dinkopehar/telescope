import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/test/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <h1>React + DRF Connection Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
