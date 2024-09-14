import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";

const App: React.FC = () => {
  const socket = new WebSocket("ws://localhost:3001");

  useEffect(() => {
    socket.onopen = () => {
      console.log("подключился");
      getAppeals();
    };

    socket.onmessage = ({ data }) => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
    };

    return () => {};
  }, []);

  const getAppeals = () => {
    console.log("getAppeals");
    socket.send(
      JSON.stringify({
        action: "GET_APPEALS",
        client_id: 1,
      })
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Layout />
      </div>
    </div>
  );
};

export default App;
