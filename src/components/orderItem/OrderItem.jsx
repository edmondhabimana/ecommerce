import { useState } from 'react'
import orderItemStyles from './OrderItem.module.css'

export default function OrderItem({item}) {
  const {name, quantity, image, totalPrice, unitPrice} = item

  return (
    <div className={orderItemStyles.container}>
    <div className={orderItemStyles.image}>
      <img src={image} alt={name} className={orderItemStyles.image}/>
    </div>
    <div className={orderItemStyles.info}>
      <p>{name}</p>
      <select disabled={true}>
        <option value={quantity} >
          {`Qty ${quantity}`}
        </option>
      </select>
    </div>
    <div className={orderItemStyles.price}>
      <p>{(totalPrice).toFixed(2)}</p>
      <p>{`${(unitPrice).toFixed(2)} each`}</p>
    </div>
  </div>
  )
}