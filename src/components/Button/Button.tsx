import React from 'react'
import './Button.sass'

interface ButtonProps {
  onClick?: (e?: any) => void
  className?: string
  type?: 'submit' | 'reset' | 'button'
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`button ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  )
}
