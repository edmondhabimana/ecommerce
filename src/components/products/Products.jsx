import productsStyles from './Products.module.css'
import data from '../../data'
import Product from '../product/Product'

export default function Products () {
  return(
    <div className={productsStyles.container}>
      <p>Best Seller Products</p>
      <p className={productsStyles['products-description']}>speaker there many variations passages</p>
      <div className={productsStyles['products-container']}>
        {data.map((product, index) => (
          <Product key={index} product={product}/>
        ))}
      </div>
    </div>
  )
}