import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Task } from '../../store/types'
import { RootState } from '../../store/store'
import './Tasks.sass'
import { Button } from '../Button/Button'
import { setTaskToDelete, setTaskToEdit } from '../../store/actions'

interface TasksProps {
  tasks: Task[]
}

export const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const dispatch = useDispatch()
  const list = useSelector((state: RootState) => state.list.selectedList!)

  const setTaskToEditHandler = (task: Task) => {
    dispatch(setTaskToEdit(task, list))
  }

  const setTaskToDeleteHandler = (task: Task) => {
    dispatch(setTaskToDelete(task, list))
  }

  const tasksTable = (
    <table className='tasks-table'>
      <thead>
        <tr>
          <th className='tasks-table__column-head'>Task</th>
          <th className='tasks-table__column-head'>Edit</th>
          <th className='tasks-table__column-head'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task: Task) => (
          <tr
            key={task.id}
            className={`tasks-table__task ${task.complete ? 'completed' : ''}`}
          >
            <td>{task.name}</td>
            <td>
              <Button
                className='tasks-table__btn button--small'
                onClick={() => setTaskToEditHandler(task)}
              >
                <span>
                  <i className='fas fa-edit'></i>
                </span>
              </Button>
            </td>
            <td>
              <Button
                className='tasks-table__btn button--small button--danger'
                onClick={() => setTaskToDeleteHandler(task)}
              >
                <span>
                  <i className='fas fa-times'></i>
                </span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  return (
    <section className='tasks'>
      <h2 className='tasks__title'>List of tasks in selected list</h2>
      {tasks.length === 0 ? (
        <p className='tasks__warning'>No tasks</p>
      ) : (
        tasksTable
      )}
    </section>
  )
}
