import React, { useEffect } from "react"
import useFetchData from "../../hooks/useFetchData"
import "./swoosh.css"

function Swoosh() {
  const { data } = useFetchData()

  return <div className='swoosh'></div>
}

export default Swoosh
