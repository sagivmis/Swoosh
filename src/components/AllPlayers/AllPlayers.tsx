import React, { useCallback, useState } from "react"
import { usePlayersContext } from "../../context/PlayersContext"
import Player from "../Player"
import { Button, Input } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import "./all-players.css"

const AllPlayers = () => {
  const { players, favoritePlayersIds } = usePlayersContext()

  const [playerSearch, setPlayerSearch] = useState("")
  const [isSearching, setIsSearching] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlayerSearch(e.target.value)
  }

  const toggleSearch = () => {
    setIsSearching((prev) => !prev)
  }

  return (
    <div className='list-container all-players-container'>
      <div className='list-controls all-players-controls'>
        <div className='controls'>
          <Button onClick={toggleSearch} className='search-btn'>
            <SearchIcon className='search-icon' />
          </Button>
          {isSearching && (
            <Input
              onChange={handleInputChange}
              disableUnderline
              className='player-search-input-container'
              classes={{ input: "player-search-input" }}
            />
          )}
        </div>
      </div>

      <div className='list-content all-players-content'>
        {players
          .filter(
            (player) =>
              `${player.first_name} ${player.last_name}`
                .toLowerCase()
                .includes(playerSearch.toLowerCase()) &&
              !favoritePlayersIds.includes(player.id)
          )
          .map((player) => (
            <Player
              player={player}
              list='regular'
              key={`${player.first_name}_${player.id}`}
            />
          ))}
      </div>
    </div>
  )
}

export default AllPlayers
