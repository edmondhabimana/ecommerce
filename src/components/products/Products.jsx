import productsStyles from './Products.module.css'
import Product from '../product/Product'
import { useCollection } from '../../hooks/useCollection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerScale } from '@fortawesome/pro-thin-svg-icons'

export default function Products () {
  const { collection } = useCollection('products')

  return(
    <>
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