import React, { useCallback, useEffect, useState } from "react"
import { NBA_PLAYERS_URL } from "../config"
import axios from "axios"
import { GetAllNBAPlayersReturn, NBAPlayer } from "../types"
import { players } from "../config/data"

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<NBAPlayer[]>(players || [])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const initialFetchNbaPlayersData = useCallback(async () => {
    setIsLoading(true)

    const res = await axios.get<GetAllNBAPlayersReturn>(
      `${NBA_PLAYERS_URL}?per_page=100`
    )

    setIsLoading(false)

    setData(res.data.data)
    setTotalPages(res.data.meta.total_pages)
    setCurrentPage(1)
  }, [])

  const fetchAllNbaPlayers = useCallback(async () => {
    setIsLoading(true)
    try {
      if (currentPage < totalPages) {
        const res = await axios.get<GetAllNBAPlayersReturn>(
          `${NBA_PLAYERS_URL}?page=${currentPage + 1}&per_page=100`
        )
        setData((prevData) => [...prevData, ...res.data.data])
        setCurrentPage(res.data.meta.current_page)
      }
    } catch (err) {
      console.log(err)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    // initialFetchNbaPlayersData()
  }, [initialFetchNbaPlayersData])

  useEffect(() => {
    // fetchAllNbaPlayers()
  }, [fetchAllNbaPlayers])

  useEffect(() => {
    if (totalPages === currentPage) {
      setIsLoading(false)
    }
  }, [currentPage, totalPages])

  return { data }
}

export default useFetchData
