import orderItemStyles from './OrderItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/pro-solid-svg-icons'

export default function OrderItem({item, setDisplayModal, setProductId, setProductQuantity, deleteItem, dispatch}) {
  const {id, name, quantity, image, totalPrice, unitPrice} = item

  return (
    <div className={orderItemStyles['order-item']}>
      <div className={orderItemStyles.image}>
        <img src={image} alt={name} className={orderItemStyles.image}/>
      </div>
      <div className={orderItemStyles.container}>
        <div className={orderItemStyles.info}>
          <p>{name}</p>
          <div             
            onClick={() => {
              setDisplayModal((value) => !value);
              setProductId(id)
              setProductQuantity(quantity)
            }}
            className={orderItemStyles.select}
          >
            <select disabled={true}>
              <option value={quantity} >
                {`Qty ${quantity}`}
              </option>
            </select>
          </div>
        </div>
        <div className={orderItemStyles.price}>
          <p>${(totalPrice).toFixed(2)}</p>
          <p>${`${(unitPrice).toFixed(2)} each`}</p>
        </div>
      </div>
      <FontAwesomeIcon 
        icon={faTrash} 
        className={orderItemStyles.trash}
        onClick={() => dispatch(deleteItem(id))}
      />
    </div>
  )
}