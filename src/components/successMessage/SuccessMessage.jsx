import successMessageStyles from './SuccessMessage.module.css'
import { useEffect } from 'react'
import { useCart } from '../../context/cartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/pro-regular-svg-icons'

export default function SuccessMessage() {
  const { successMessage, deleteSuccessMessage } = useCart()

  // if(successMessage.length === 0) return null

  //need to find a solution for useEffect and timer
  useEffect(() => {
    // console.log('inside useEffect 1');
    const timerRef = setInterval(function () {
      deleteSuccessMessage()
    }, 1200)
    return () => clearInterval(timerRef)

  }, [deleteSuccessMessage])

  return(
    <div className={successMessageStyles.absolute}>
      {successMessage.map((suc, index) => (
        <div key={index} className={successMessageStyles['success-message']}>
          <div className={successMessageStyles['check-container']}><FontAwesomeIcon icon={faCheck} /></div>
          <p>{suc}</p>
        </div>
      ))}
    </div>
  )

}