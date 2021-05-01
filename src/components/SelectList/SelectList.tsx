import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedList } from '../../store/actions'
import { RootState } from '../../store/store'
import { List } from '../../store/types'
import './SelectList.sass'

export const SelectList: React.FC = () => {
  const dispatch = useDispatch()
  const lists = useSelector((state: RootState) => state.list.lists)

  const selectChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setSelectedList(e.currentTarget.value))
  }

  return (
    <section className='select-list'>
      <h2 className='select-list__title'>Choose a list</h2>
      <div className='select-list-control'>
        <select
          className='select-list-control__select'
          onChange={selectChangeHandler}
        >
          <option value=''>Select List</option>
          {Object.keys(lists).length > 0 &&
            Object.values(lists).map((list: List) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
        </select>
      </div>
    </section>
  )
}
