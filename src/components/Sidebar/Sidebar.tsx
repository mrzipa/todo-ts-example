import React from 'react'
import { CreateNewList } from '../CreateNewList/CreateNewList'
import { Lists } from '../Lists/Lists'
import './Sidebar.sass'

export const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      <CreateNewList />
      <Lists />
    </div>
  )
}
