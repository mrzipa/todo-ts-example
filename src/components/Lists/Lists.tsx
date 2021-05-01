import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { getLists, setListIdToDelete, setListToEdit } from '../../store/actions'
import { List } from '../../store/types'
import './Lists.sass'

export const Lists: React.FC = () => {
  const dispatch = useDispatch()
  const lists = useSelector((state: RootState) => state.list.lists)

  React.useEffect(() => {
    dispatch(getLists())
  }, [dispatch])

  const setListToEditHandler = (id: string) => {
    dispatch(setListToEdit(id))
  }

  const setListIdToDeleteHandler = (id: string) => {
    dispatch(setListIdToDelete(id))
  }

  return (
    <div className='lists'>
      <p className='lists__head'>Your lists</p>
      <div className='lists-body'>
        {Object.keys(lists).length === 0 ? (
          <p className='lists-body__text'>No lists created</p>
        ) : (
          <div className='lists-body-inner'>
            {Object.values(lists).map((list: List) => {
              return (
                <div className='lists-body-inner-content' key={list.id}>
                  <p
                    className='lists-body-inner-content__name'
                    onClick={() => setListToEditHandler(list.id)}
                  >
                    {list.name}
                  </p>
                  <span
                    className='lists-body-inner-content__icon'
                    onClick={() => setListIdToDeleteHandler(list.id)}
                  >
                    <i className='fas fa-times-circle'></i>
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
