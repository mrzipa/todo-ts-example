import React, { FormEvent } from 'react'
import './CreateNewList.sass'
import { useDispatch } from 'react-redux'
import { List } from '../../store/types'
import { addList, setNotifiction } from '../../store/actions'
import { Button } from '../Button/Button'

export const CreateNewList: React.FC = () => {
  const dispatch = useDispatch()
  const [listName, setListName] = React.useState('')
  const inputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setListName(e.currentTarget.value)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (listName.trim() === '') {
      return alert('List name is required!')
    }
    const newList: List = {
      id: `list-${new Date().getTime()}`,
      name: listName,
      tasks: [],
    }
    dispatch(addList(newList))
    dispatch(setNotifiction(`New list("${newList.name}") created! `))
    setListName('')
  }
  return (
    <div className='create-list'>
      <div className='create-list-card card'>
        <div className='card-header'>
          <p className='card-header__title'>Create new list</p>
        </div>
        <div className='card-content'>
          <form onSubmit={submitHandler}>
            <div className='card-content-field'>
              <label className='card-content-field__label'>List name</label>
              <div className='card-content-field__control'>
                <input
                  type='text'
                  className='card-content-field__input'
                  placeholder='List name'
                  name='listName'
                  value={listName}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className='card-content-field__control'>
                <Button className='card-content-field__button'>Create</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
