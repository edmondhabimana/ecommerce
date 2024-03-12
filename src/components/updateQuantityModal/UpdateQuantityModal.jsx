import modalStyles from './UpdateQuantityModal.module.css'
import { useState } from 'react';
import { useDocument } from '../../hooks/useDocument';
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faPlus } from '@fortawesome/pro-solid-svg-icons';

export default function UpdateQuantityModal({productId, setDisplayModal, productQuantity}) {
  const { data } = useDocument('cart', productId)
  const { updateFromModal } = useCart()
  const { image, name} = data
  console.log(data);
  const [updateQuantity, setUpdateQuantity] = useState(productQuantity)
  // console.log('updateQuantity', updateQuantity);

  return(
    <>
      <div 
        className={modalStyles.overlay} 
        onClick={() => setDisplayModal((value) => !value)}
      >
      </div>
      {data.length !== 0 && 
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
              type="number" 
              name='updateQuantity'
              value={updateQuantity} 
              // placeholder={updateQuantity}
              // defaultValue={quantity && updateQuantity}
              min='1'
              onChange={(e) => setUpdateQuantity(e.target.value)}
            />
            <button onClick={() => setUpdateQuantity((value) => value + 1)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button 
            className={modalStyles.update}
            onClick={() => {updateFromModal(name, updateQuantity); setDisplayModal((value) => !value)}}
          >Update</button>
        </div>
      }

    </>

  )
}