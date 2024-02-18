import recommendedStyles from './Recommended.module.css'
import { useNavigate } from 'react-router-dom'

export default function Recommanded({collectionItem}) {
  const navigate = useNavigate()
  // console.log(collectionItem.id);
  function handleClick() {
    navigate(`/product-detail/${collectionItem.id}`)
  }

  return(
    <>
      {collectionItem && (
        <div>
          <img 
            src={collectionItem.images[0]} alt='recommanded product' 
            className={recommendedStyles['recommand-image']}
            onClick={() => handleClick()}
          />
          <p>{collectionItem.name}</p>
          <p>${collectionItem.price}</p>
        </div>
      )}
    </>
  )
}