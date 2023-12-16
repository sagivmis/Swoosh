import React from "react"
import "./swoosh.css"
import AllPlayers from "../AllPlayers"
import FavoritePlayers from "../FavoritePlayers"

function Swoosh() {
  return (
    <div className='swoosh-container'>
      <div className='swoosh'>
        <AllPlayers />
        <FavoritePlayers />
      </div>
    </div>
  )
}

export default Swoosh
