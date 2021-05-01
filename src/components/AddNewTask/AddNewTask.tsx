import React from 'react'
import { useDispatch } from 'react-redux'
import { addTask, setNotifiction } from '../../store/actions'
import { List, Task } from '../../store/types'
import { Button } from '../Button/Button'
import './AddNewTask.sass'

interface AddNewTaskProps {
  list: List
}

export const AddNewTask: React.FC<AddNewTaskProps> = ({ list }) => {
  const dispatch = useDispatch()
  const [taskName, setTaskName] = React.useState('')

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (taskName.trim() === '') {
      return alert('Task name is required!')
    }

    const newTask: Task = {
      name: taskName,
      id: `task-${new Date().getTime()}`,
      complete: false,
    }
    dispatch(addTask(newTask, list))
    dispatch(setNotifiction(`New task created("${newTask.name}")!`))
    setTaskName('')
  }

  return (
    <section className='add-new-task'>
      <h2 className='add-new-task__title'>Add new task to selected field</h2>
      <form className='add-new-task-form' onSubmit={submitHandler}>
        <div className='add-new-task-form-field form-field'>
          <label htmlFor='' className='form-field__label'>
            Task name
          </label>
          <div className='form-field-control'>
            <input
              type='text'
              className='form-field-control__input'
              placeholder='Add task'
              value={taskName}
              onChange={changeHandler}
            />
          </div>
          <div className='form-field-control'>
            <Button type='submit' className='form-field-control__btn'>
              Add new task
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}
