import cartItemStyles from './CartItems.module.css'
import Button from '../button/Button'
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/sharp-solid-svg-icons';

export default function CartItem({ item }) {
  // console.log(item);
  const { image, name, totalPrice, quantity, unitPrice } = item
  const { increaseQuantity, decreaseQuantity, deleteItem } = useCart()
  // console.log(item);

  return(
    <div className={cartItemStyles['cart-item']}>
      <div className={cartItemStyles['container']}>
        <img src={image} alt={`${name}`} className={cartItemStyles.image}/>
      </div>
      <div className={cartItemStyles['container']}>
        <p>{name}</p>
        <Button 
          originalPrice={unitPrice}
          quantity={quantity} 
          name={name}
          increaseQuantity={increaseQuantity} 
          decreaseQuantity={decreaseQuantity}
        />
      </div>
      <div className={cartItemStyles['container']}>
        <p>${totalPrice}</p>
        <FontAwesomeIcon 
          icon={faTrash} 
          className={cartItemStyles.trash}
          onClick={()=> deleteItem(name)}
        />
      </div>
    </div>
  )
}