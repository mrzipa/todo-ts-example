import React from 'react'
import './App.sass'

import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Notification } from './components/Notification/Notification'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { DeleteListModal } from './components/DeleteListModal/DeleteListModal'
import { EditListModal } from './components/EditListModal/EditListModal'
import { MainContent } from './components/MainContent/MainContent'
import { EditTaskModal } from './components/EditTaskModal/EditTaskModal'
import { DeleteTaskModal } from './components/DeleteTaskModal/DeleteTaskModal'

const App: React.FC = () => {
  const notificationMsg = useSelector(
    (state: RootState) => state.notification.message
  )
  const listIdToDelete = useSelector(
    (state: RootState) => state.list.listIdToDelete
  )
  const listToEdit = useSelector((state: RootState) => state.list.listToEdit)
  const taskToEdit = useSelector((state: RootState) => state.list.taskToEdit)
  const taskToDelete = useSelector(
    (state: RootState) => state.list.taskToDelete
  )
  return (
    <div className='App'>
      <Header
        title='Task List App'
        subtitle='Create some lists and add some tasks to each list'
      />
      <div className='container'>
        <Sidebar />
        <MainContent />
      </div>
      <Notification msg={notificationMsg} />
      {listIdToDelete && <DeleteListModal listId={listIdToDelete} />}
      {listToEdit && <EditListModal list={listToEdit} />}
      {taskToEdit && <EditTaskModal taskToEdit={taskToEdit} />}
      {taskToDelete && <DeleteTaskModal taskToDelete={taskToDelete} />}
    </div>
  )
}

export default App
