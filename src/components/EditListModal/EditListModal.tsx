import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { setListToEdit, updateList } from '../../store/actions'
import { List } from '../../store/types'
import { Button } from '../Button/Button'
import { setNotifiction } from '../../store/actions'
import './EditListModal.sass'

interface EditListModalProps {
  list: List
}

export const EditListModal: React.FC<EditListModalProps> = ({ list }) => {
  const [listName, setListName] = React.useState(list.name)
  const dispatch = useDispatch()

  const hideModalHandler = () => {
    dispatch(setListToEdit(''))
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (listName.trim() === '') {
      return alert('List name is required!')
    }

    if (listName.trim() === list.name) {
      return alert('List name is the same as before!')
    }

    dispatch(updateList(list.id, listName.trim()))
    dispatch(setNotifiction(`List "${list.name}" updated!`))
  }
  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setListName(e.currentTarget.value)
  }
  return ReactDOM.createPortal(
    <div className='EditListModal ListModal'>
      <div className='modal-backdrop' onClick={hideModalHandler}></div>
      <form className='modal-card' onSubmit={submitHandler}>
        <header className='modal-card-head'>
          <p className='modal-card-head__title'>Edit list</p>
          <div className='modal-card-head__btn' onClick={hideModalHandler}>
            <i className='fas fa-times'></i>
          </div>
        </header>
        <div className='modal-card-body'>
          <div className='modal-card-body-field field'>
            <label className='field__label'>List Name</label>
            <div className='field-control'>
              <input
                type='text'
                className='field-control__input'
                name='listName'
                placeholder='List Name'
                value={listName}
                onChange={changeHandler}
              />
            </div>
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
            onClick={hideModalHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>,
    document.querySelector('#modal') as HTMLElement
  )
}
