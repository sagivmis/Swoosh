import React from "react"
import "./color-picker.css"

interface IColorPicker {
  color: string
  handleChangeCurrentColor: (color: string) => void
}

const ColorPicker = (props: IColorPicker) => {
  const { color, handleChangeCurrentColor } = props

  return (
    <div className='color-picker-container'>
      <div
        className='color-picker'
        style={{ backgroundColor: color }}
        onClick={() => handleChangeCurrentColor(color)}
      />
    </div>
  )
}

export default ColorPicker
