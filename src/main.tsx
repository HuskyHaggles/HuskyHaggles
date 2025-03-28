// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*
      Set the default site title once here. 
      Pages that explicitly set `document.title` will override this.
    */}
    {(() => {
      document.title = "Husky Haggles";
      return null;
    })()}
    <App />
  </React.StrictMode>
);
