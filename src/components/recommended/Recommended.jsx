import recommendedStyles from './Recommended.module.css'

export default function Recommanded({collectionItem}) {

  return(
    <>
      {collectionItem && (
        <div>
          <img 
            src={collectionItem.images[0]} alt='recommanded product' 
            className={recommendedStyles['recommand-image']}
          />
          <p>{collectionItem.name}</p>
          <p>${collectionItem.price}</p>
        </div>
      )}
    </>
  )
}