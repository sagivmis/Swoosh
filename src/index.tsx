import React from "react"
import ReactDOM from "react-dom/client"
import Swoosh from "./components/Swoosh"
import PlayersContextProvider from "./context/PlayersContext"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <PlayersContextProvider>
      <Swoosh />
    </PlayersContextProvider>
  </React.StrictMode>
)
