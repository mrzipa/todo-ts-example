import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import {
  setNotifiction,
  unsetTaskToEdit,
  updateTask,
} from '../../store/actions'
import { List, Task } from '../../store/types'
import { Button } from '../Button/Button'
import './EditTaskModal.sass'

interface EditTaskModalProps {
  taskToEdit: {
    task: Task
    list: List
  }
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  taskToEdit: { task, list },
}) => {
  const dispatch = useDispatch()
  const [taskName, setTaskName] = React.useState(task.name)
  const [taskState, setTaskState] = React.useState(task.complete)

  const nameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value)
  }

  const closeModalHandler = () => {
    dispatch(unsetTaskToEdit())
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (taskName.trim() === '') {
      return alert('Task name is required!')
    }
    if (taskName === task.name && taskState === task.complete) {
      return alert('Task name and state are the same as before!')
    }

    dispatch(updateTask(task.id, taskName, taskState, list))
    dispatch(setNotifiction(`Task "${task.name}" updated!`))
  }

  const stateChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskState(e.currentTarget.checked)
  }

  return ReactDOM.createPortal(
    <div className='EditTaskModal ListModal'>
      <div className='modal-backdrop' onClick={closeModalHandler}></div>
      <form className='modal-card' onSubmit={submitHandler}>
        <header className='modal-card-head'>
          <p className='modal-card-head__title'>Edit task</p>
          <div className='modal-card-head__btn' onClick={closeModalHandler}>
            <i className='fas fa-times'></i>
          </div>
        </header>
        <div className='modal-card-body'>
          <div className='modal-card-body-field field'>
            <label className='field__label'>Task Name</label>
            <div className='field-control'>
              <input
                type='text'
                className='field-control__input'
                name='taskName'
                placeholder='Task Name'
                value={taskName}
                onChange={nameChangeHandler}
              />
            </div>
          </div>

          <div className='modal-card-body-field field'>
            <label className='field__checkbox'>
              <input
                type='checkbox'
                className='field__input'
                checked={taskState}
                onChange={stateChangeHandler}
              />{' '}
              Complete
            </label>
          </div>
        </div>
        <div className='modal-card-footer'>
          <Button
            type='submit'
            className='modal-card-footer__btn button--small'
          >
            Save changes
          </Button>
          <Button
            type='button'
            className='modal-card-footer__btn button--small button--secondary'
            onClick={closeModalHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>,
    document.querySelector('#modal') as HTMLElement
  )
}
