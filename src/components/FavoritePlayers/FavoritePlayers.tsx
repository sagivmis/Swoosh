import React, { useState } from "react"
import { usePlayersContext } from "../../context/PlayersContext"
import Player from "../Player"
import ColorPicker from "../ColorPicker"
import { colors } from "../../config"
import "./favorite-players.css"

const FavoritePlayers = () => {
  const { favoritePlayers } = usePlayersContext()

  const [currentColor, setCurrentColor] = useState(colors[0])

  const handleChangeCurrentColor = (color: string) => {
    setCurrentColor(color)
  }
  return (
    <div className='list-container favorite-players-container'>
      <div
        className='list-controls favorite-players-controls'
        style={{ backgroundColor: currentColor }}
      >
        {colors.map((color) => (
          <ColorPicker
            color={color}
            handleChangeCurrentColor={handleChangeCurrentColor}
            key={`${color}}`}
          />
        ))}
      </div>
      <div
        className='list-content all-players-content'
        style={{ backgroundColor: currentColor }}
      >
        {favoritePlayers.map((player) => (
          <Player
            player={player}
            list='favorite'
            key={`${player.first_name}_${player.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default FavoritePlayers
