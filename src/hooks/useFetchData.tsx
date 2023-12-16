import React, { useCallback, useEffect, useState } from "react"
import { NBA_PLAYERS_URL } from "../config"
import axios from "axios"
import { GetAllNBAPlayersReturn, NBAPlayer } from "../types"

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<NBAPlayer[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const initialFetchNbaPlayersData = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await axios.get<GetAllNBAPlayersReturn>(
        `${NBA_PLAYERS_URL}?per_page=100`
      )
      setData(res.data.data)
      setTotalPages(res.data.meta.total_pages)
      setCurrentPage(1)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }

    setIsLoading(false)
  }, [])

  const fetchAllNbaPlayers = useCallback(async () => {
    try {
      if (currentPage < totalPages) {
        setIsLoading(true)
        const res = await axios.get<GetAllNBAPlayersReturn>(
          `${NBA_PLAYERS_URL}?page=${currentPage + 1}&per_page=100`
        )

        if (totalPages === currentPage + 1) {
          setIsLoading(false)
        }
        setData((prevData) => [...prevData, ...res.data.data])
        setCurrentPage(res.data.meta.current_page)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    initialFetchNbaPlayersData()
  }, [initialFetchNbaPlayersData])

  useEffect(() => {
    fetchAllNbaPlayers()
  }, [fetchAllNbaPlayers])

  return { data, isLoading }
}

export default useFetchData
