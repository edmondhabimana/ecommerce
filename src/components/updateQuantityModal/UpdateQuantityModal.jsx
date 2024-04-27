import modalStyles from './UpdateQuantityModal.module.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentQuantityById, getItemById, setItemQuantityAndTotalPrice } from '../../Cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faPlus } from '@fortawesome/pro-solid-svg-icons';

export default function UpdateQuantityModal({productId, setDisplayModal}) {
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuantityById(productId))
  const item = useSelector(getItemById(productId))
  console.log(item);
  const { image, name, unitPrice} = item
  const [updateQuantity, setUpdateQuantity] = useState(currentQuantity)

  function handleAddToCart() {
    // console.log(cart);
    const newItem = {
      id: name,
      totalPrice: unitPrice * updateQuantity,
      quantity: updateQuantity
    }

    dispatch(setItemQuantityAndTotalPrice(newItem))
  }

  return(
    <>
      <div 
        className={modalStyles.overlay} 
        onClick={() => setDisplayModal((value) => !value)}
      >
      </div>
      <div className={modalStyles.modal}>
        <div className={modalStyles.tab}>
          <img src={image} alt={name} className={modalStyles.image}/>
          <div>
            <p>Update quantity</p>
            <p>{name}</p>
          </div>
          <FontAwesomeIcon 
            icon={faXmark} 
            className={modalStyles.x}
            onClick={() => setDisplayModal((value) => !value)}
          />
        </div>
        <div className={modalStyles.buttons}>
          <button onClick={
            () => {
                if(updateQuantity <= 1) return
                setUpdateQuantity((value) => value - 1)
              }
            }
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input 
            type="text" 
            name='updateQuantity'
            value={updateQuantity} 
            readOnly
            // placeholder={updateQuantity}
            // defaultValue={quantity && updateQuantity}
            min='1'
            // onChange={(e) => setUpdateQuantity(e.target.value)}
          />
          <button onClick={() => setUpdateQuantity((value) => value + 1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button 
          className={modalStyles.update}
          onClick={() => {handleAddToCart(); setDisplayModal((value) => !value)}}
        >Update</button>
      </div>
    </>

  )
}