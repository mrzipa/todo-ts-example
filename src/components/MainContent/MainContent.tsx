import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { AddNewTask } from '../AddNewTask/AddNewTask'
import { SelectList } from '../SelectList/SelectList'
import { Tasks } from '../Tasks/Tasks'
import './MainContent.sass'

export const MainContent: React.FC = () => {
  const selectedList = useSelector(
    (state: RootState) => state.list.selectedList
  )
  return (
    <div className='main-content'>
      <div className='main-content-container'>
        <SelectList />
        {selectedList && (
          <>
            <AddNewTask list={selectedList} />
            <hr />
            <Tasks tasks={selectedList.tasks} />
          </>
        )}
      </div>
    </div>
  )
}
