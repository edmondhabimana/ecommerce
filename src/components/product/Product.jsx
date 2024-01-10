import productStyles from './Product.module.css'

export default function product({product}) {
  return (
    <div className={productStyles['product-container']}>
      <img src={product.products[0]} alt="earphones/headphones" className={productStyles.product}/>
      <p className={productStyles.name}>{product.name}</p>
      <p className={productStyles.price}>${product.price}</p>
    </div>
  )
}