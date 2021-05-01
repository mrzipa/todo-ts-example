import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { Task, List } from '../../store/types'
import {
  unsetTaskToDelete,
  deleteTask,
  setNotifiction,
} from '../../store/actions'
import './DeleteTaskModal.sass'
import { Button } from '../Button/Button'

interface DeleteTaskModalProps {
  taskToDelete: {
    task: Task
    list: List
  }
}

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  taskToDelete: { task, list },
}) => {
  const dispatch = useDispatch()
  const closeModalHandler = () => {
    dispatch(unsetTaskToDelete())
  }
  const deleteHandler = () => {
    dispatch(deleteTask(task, list))
    dispatch(setNotifiction(`Task "${task.name}" deleted!`, 'danger'))
  }

  return ReactDOM.createPortal(
    <div className='deleteTaskModal ListModal'>
      <div className='modal-backdrop' onClick={closeModalHandler}></div>
      <div id='modal-card' className='deleteTaskModal-card modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-head__title'>
            Are you sure you want to delete this list ?
          </p>
        </header>
        <footer className='modal-card-footer'>
          <Button
            className='modal-card-footer__btn button--small button--danger'
            onClick={deleteHandler}
          >
            Delete
          </Button>
          <Button
            className='modal-card-footer__btn button--small button--secondary'
            onClick={closeModalHandler}
          >
            Cancel
          </Button>
        </footer>
      </div>
    </div>,
    document.querySelector('#modal') as HTMLElement
  )
}
