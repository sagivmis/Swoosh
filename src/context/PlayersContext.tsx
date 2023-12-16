import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import { NBAPlayer } from "../types"
import useFetchData from "../hooks/useFetchData"
import { noopBool, noop } from "../utils"

interface IPlayersContext {
  players: NBAPlayer[]
  favoritePlayers: NBAPlayer[]
  favoritePlayersIds: number[]
  addFavoritePlayer: (player: NBAPlayer) => boolean
  removeFavoritePlayer: (player: NBAPlayer) => boolean
  removeAllFavorites: () => void
  isLoading: boolean
}
const DEFAULT_CONTEXT: IPlayersContext = {
  players: [],
  favoritePlayers: [],
  favoritePlayersIds: [],
  addFavoritePlayer: noopBool,
  removeFavoritePlayer: noopBool,
  removeAllFavorites: noop,
  isLoading: false
}

export const PlayersContext = createContext<IPlayersContext>(DEFAULT_CONTEXT)

const PlayersContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [favoritePlayers, setFavoritePlayers] = useState<NBAPlayer[]>([])
  const [favoritePlayersIds, setFavoritePlayersIds] = useState<number[]>([])

  const { data, isLoading } = useFetchData()

  const addFavoritePlayer = useCallback(
    (player: NBAPlayer) => {
      if (isLoading) {
        console.log("isLoading")
        // to let the requests finish filling the array in the first fetch
        // as each fetch is of 100 players
        return false
      }

      setFavoritePlayersIds((prev) => [...prev, player.id])
      return true
    },
    [isLoading]
  )

  const removeFavoritePlayer = useCallback(
    (player: NBAPlayer) => {
      if (isLoading) {
        return false
      }

      setFavoritePlayersIds((prev) =>
        prev.filter((favPlayer) => favPlayer !== player.id)
      )

      return true
    },
    [isLoading]
  )

  const removeAllFavorites = useCallback(() => {
    setFavoritePlayersIds([])
    return true
  }, [])

  useEffect(() => {
    setFavoritePlayers(
      data.filter((player) => favoritePlayersIds.includes(player.id))
    )
  }, [favoritePlayersIds])

  return (
    <PlayersContext.Provider
      value={{
        favoritePlayersIds,
        players: data,
        favoritePlayers,
        addFavoritePlayer,
        removeFavoritePlayer,
        removeAllFavorites,
        isLoading
      }}
    >
      {children}
    </PlayersContext.Provider>
  )
}

export const usePlayersContext = () => useContext(PlayersContext)

export default PlayersContextProvider
