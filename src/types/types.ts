export type NBATeam = {
  id: number
  abbreviation: string
  city: string
  conference: string
  full_name: string
  name: string
  division: string
}

export type NBAPlayer = {
  first_name: string
  height_feet: number | null
  height_inches: number | null
  id: number
  last_name: string
  position: string
  team: NBATeam
  weight_pounds: number | null
}

export type GetAllNBAPlayersReturn = {
  data: NBAPlayer[]
  meta: {
    total_pages: number
    current_page: number
    next_page: number
    per_page: number
    total_count: number
  }
}
