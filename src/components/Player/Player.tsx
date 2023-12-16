import React, { useCallback } from "react"
import "./player.css"
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball"
import { NBAPlayer } from "../../types"
import { usePlayersContext } from "../../context/PlayersContext"
import clsx from "clsx"

interface IPlayer {
  player: NBAPlayer
  list: "regular" | "favorite"
}

const Player = (props: IPlayer) => {
  const { player, list } = props
  const { addFavoritePlayer, removeFavoritePlayer } = usePlayersContext()

  const handlePlayerClick = useCallback(() => {
    if (list === "regular") {
      addFavoritePlayer(player)
      return
    } else if (list === "favorite") {
      removeFavoritePlayer(player)
    }
  }, [player])

  return (
    <div className='player'>
      <span className='player-name'>{`${player.first_name} ${player.last_name}`}</span>
      <SportsBasketballIcon
        className={clsx("basketball-icon", list)}
        onClick={handlePlayerClick}
      />
    </div>
  )
}

export default Player
