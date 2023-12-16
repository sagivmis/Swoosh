import { NBAPlayer } from "../types"

export const noopBool = () => false
export const noop = () => {}
export const playerSort = (player1: NBAPlayer, player2: NBAPlayer) =>
  player1.id - player2.id
