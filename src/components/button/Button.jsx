import buttonStyles from './Button.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons"


export default function Button({ quantity, name, increaseQuantity, decreaseQuantity, originalPrice }) {

  return(
    <>
      <div className={buttonStyles.button}>
        <button 
          className={buttonStyles.minus} 
          onClick={() => name ? decreaseQuantity(name, originalPrice) : decreaseQuantity()}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
          <span className={buttonStyles.quantity}>
            {quantity}
          </span>
        <button 
          className={buttonStyles.plus}
          onClick={() => name ? increaseQuantity(name, originalPrice) : increaseQuantity()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  )
}