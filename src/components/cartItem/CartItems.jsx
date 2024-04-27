import cartItemStyles from './CartItems.module.css'
import Button from '../button/Button'
// import { useCart } from '../../context/cartContext';
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/sharp-solid-svg-icons';
import { increaseItemQuantity, decreaseItemQuantity, deleteItem } from '../../Cart/cartSlice';

export default function CartItem({ item }) {
  // console.log(item);
  const dispatch = useDispatch()
  const { image, name, totalPrice, quantity, unitPrice } = item
  // const { increaseQuantity, decreaseQuantity, deleteItem } = useCart()
  // console.log(item);

  return(
    <div className={cartItemStyles['cart-item']}>
      <div className={cartItemStyles['container']}>
        <img src={image} alt={`${name}`} className={cartItemStyles.image}/>
      </div>
      <div className={cartItemStyles['container']}>
        <p>{name}</p>
        <Button 
          quantity={quantity} 
          name={name}
          dispatch={dispatch}
          increaseQuantity={increaseItemQuantity} 
          decreaseQuantity={decreaseItemQuantity}
        />
      </div>
      <div className={cartItemStyles['container']}>
        <p>${totalPrice}</p>
        <FontAwesomeIcon 
          icon={faTrash} 
          className={cartItemStyles.trash}
          onClick={()=> dispatch(deleteItem(name))}
        />
      </div>
    </div>
  )
}