import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifiction } from '../../store/actions'
import { RootState } from '../../store/store'
// import { Button } from '../Button/Button'
import './Notification.sass'

interface NotificationProps {
  msg: string
}

let timeout: ReturnType<typeof setTimeout>

export const Notification: React.FC<NotificationProps> = ({ msg }) => {
  const dispatch = useDispatch()
  const type = useSelector((state: RootState) => state.notification.type)

  React.useEffect(() => {
    if (msg !== '') {
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => {
        dispatch(setNotifiction(''))
      }, 3000)
    }
  }, [dispatch, msg])

  // const closeNotification = () => {
  //   dispatch(setNotifiction(''))
  //   clearTimeout(timeout)
  // }

  return ReactDOM.createPortal(
    <div
      className={
        msg
          ? `${
              type === 'danger'
                ? 'notification notification--danger'
                : 'notification notification--primary'
            }`
          : 'notification notification--hidden'
      }
    >
      <p className='notification__msg'>{msg}</p>
      {/* <Button
        className='notification__button button--small button--secondary'
        onClick={closeNotification}
      >
        Close
      </Button> */}
    </div>,
    document.querySelector('#notification') as HTMLElement
  )
}
