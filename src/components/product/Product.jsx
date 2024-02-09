import { useNavigate } from 'react-router'
import productStyles from './Product.module.css'

export default function Product({productItem}) {
  const navigate = useNavigate()
  const { images, name, price, id } = productItem


  function handleClick() {
    navigate(`/product-detail/${id}`)
  }

  return (
    <div 
    className={productStyles['product-container']}
    onClick={() => handleClick()}
    >
    <img src={images[0]} alt="earphones/headphones" className={productStyles.product}/>
    <p className={productStyles.name}>{name}</p>
    <p className={productStyles.price}>${price}</p>
    </div>
  )
}