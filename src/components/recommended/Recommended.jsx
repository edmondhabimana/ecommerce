import recommendedStyles from './Recommended.module.css'
import { useNavigate } from 'react-router-dom'
export default function Recommanded({collectionItem}) {
  const {images, name, price, id } = collectionItem
  const navigate = useNavigate()

  function handleNavigation() {
    navigate(`/product-detail/${id}`)
  }

  return(
    <>
      {collectionItem && (
        <div onClick={() => handleNavigation()}>
          <img 
            src={images[0]} alt='recommanded product' 
            className={recommendedStyles['recommand-image']}
          />
          <p>{name}</p>
          <p>${price}</p>
        </div>
      )}
    </>
  )
}