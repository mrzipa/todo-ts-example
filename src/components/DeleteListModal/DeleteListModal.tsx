import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteList,
  getListById,
  setListIdToDelete,
  setNotifiction,
} from '../../store/actions'
import { RootState } from '../../store/store'
import { Button } from '../Button/Button'
import './DeleteListModal.sass'

interface DeleteListModalProps {
  listId: string
}

export const DeleteListModal: React.FC<DeleteListModalProps> = ({ listId }) => {
  const dispatch = useDispatch()
  const list = useSelector((state: RootState) => state.list.listById)

  React.useEffect(() => {
    dispatch(getListById(listId))
  }, [dispatch, listId])

  const deleteListHandler = () => {
    dispatch(deleteList(listId))
    if (list) {
      dispatch(setNotifiction(`List "${list.name}" deleted!`, 'danger'))
    }
  }

  const hideModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setListIdToDelete(''))
  }

  return ReactDOM.createPortal(
    <div className='deleteListModal ListModal'>
      <div className='modal-backdrop' onClick={hideModalHandler}></div>
      <div id='modal-card' className='deleteListModal-card modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-head__title'>
            Are you sure you want to delete this list ?
          </p>
        </header>
        <div className='modal-card-body'>
          <h2 className='modal-card-body__attention'>
            All tasks related to this list will be deleted
          </h2>
          <div className='modal-card-body-content'>
            {list?.tasks.length === 0 ? (
              <p className='modal-card-body-content__info'>
                No tasks in this list!
              </p>
            ) : (
              <ul>
                {list?.tasks.map((task) => (
                  <li key={task.id} className=''>
                    {task.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <footer className='modal-card-footer'>
          <Button
            className='modal-card-footer__btn button--small button--danger'
            onClick={deleteListHandler}
          >
            Delete
          </Button>
          <Button
            className='modal-card-footer__btn button--small button--secondary'
            onClick={hideModalHandler}
          >
            Cancel
          </Button>
        </footer>
      </div>
    </div>,
    document.querySelector('#modal') as HTMLElement
  )
}
