import { useEffect } from "react"
import AddToCartMessageStyles from "./AddToCartMessage.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/pro-regular-svg-icons'

export default function AddToCartMessage({successMessage, deleteSuccesMessage}) {
  // console.log(successMessage);

  useEffect(() => {
    const timerRef = setInterval(function () {
      deleteSuccesMessage()
    }, 1200)

    return () => clearInterval(timerRef)

  }, [deleteSuccesMessage])

  return(
    <div className={AddToCartMessageStyles.absolute}>
      {successMessage.map((suc, index) => (
        <div key={index} className={AddToCartMessageStyles['success-message']}>
          <div className={AddToCartMessageStyles['check-container']}><FontAwesomeIcon icon={faCheck} /></div>
          <p>{suc}</p>
        </div>
      ))}
    </div>
  )
}