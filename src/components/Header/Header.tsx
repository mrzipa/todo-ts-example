import React from 'react'
import './Header.sass'

interface HeaderProps {
  title: string
  subtitle?: string
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className='header'>
      <div className='inner-wrapper header-container'>
        <h1 className='header-container__title'>{title}</h1>
        <h2 className='header-container__subtitle'>{subtitle}</h2>
      </div>
    </div>
  )
}
