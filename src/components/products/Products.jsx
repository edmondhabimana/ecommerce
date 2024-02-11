import productsStyles from './Products.module.css'
import { useOutletContext } from 'react-router-dom'
import Product from '../product/Product'
import SideBar from '../sideBar/SideBar'
import { useCollection } from '../../hooks/useCollection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerScale } from '@fortawesome/pro-thin-svg-icons'

export default function Products () {
  const { collection } = useCollection('products')
  const [displayCart, handleCartDisplay] = useOutletContext()
  console.log(displayCart);

  return(
    <>
    {displayCart && <SideBar displayCart={displayCart} handleCartDisplay={handleCartDisplay}/>}
    { collection.length === 0 && <FontAwesomeIcon icon={faSpinnerScale} spinPulse className={productsStyles.spinner}/>}
    {collection && 
      <div className={productsStyles.container}>
        <p>Best Seller Products</p>
        <p className={productsStyles['products-description']}>speaker there many variations passages</p>
        <div className={productsStyles['products-container']}>
          {collection.map((productItem, index) => (
            <Product key={index} productItem={productItem} />
          ))}
        </div>
       </div>
    }
    </>
  )
}