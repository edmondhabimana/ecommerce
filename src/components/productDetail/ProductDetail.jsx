import data from "../../data"
import productDetailStyles from './productDetail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons"

export default function ProductDetail() {
  const [image1, image2, image3, image4] = data[0].products
  const name = data[0].name
  const detail = data[0].details
  const price = data[0].price
  const quantity = data[0].quantity

  return(
    <div>
      <div className={productDetailStyles.body}>
        <div className={productDetailStyles['images-container']}>
          <div>
            <img src={image1} alt='Stereo' className={productDetailStyles['main-image']}/>
          </div>
          <div>
            <img src={image1} alt='Stereo' className={productDetailStyles['smaller-images']}/>
            <img src={image2} alt='Stereo' className={productDetailStyles['smaller-images']}/>
            <img src={image3} alt='Stereo' className={productDetailStyles['smaller-images']}/>
            <img src={image4} alt='Stereo' className={productDetailStyles['smaller-images']}/>
          </div>
        </div>
        <div className={productDetailStyles['info-container']}>
          <div className={productDetailStyles.info}>
            <p>{name}</p>
            <p>Details: </p>
            <p>{detail}</p>
            <p>${price}</p>
            <p>Quantity: 
              <button className={productDetailStyles.minus}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>
                {quantity}
              </span>
              <button className={productDetailStyles.plus}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </p>
          </div>
          <div className={productDetailStyles.buttons}>
            <button className={productDetailStyles['white-button']}>Add to Cart</button>
            <button className={productDetailStyles['red-button']}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className={productDetailStyles.recommand}>
        <p>You may also like</p>
        <div className={productDetailStyles['animation-div']}>
          <div>
            <img src={data[0].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[0].name}</p>
            <p>${data[0].price}</p>
          </div>
          <div>
            <img src={data[1].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[1].name}</p>
            <p>${data[1].price}</p>
          </div>
          <div>
            <img src={data[2].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[2].name}</p>
            <p>${data[2].price}</p>
          </div>
          <div>
            <img src={data[3].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[3].name}</p>
            <p>${data[3].price}</p>
          </div>
          <div>
            <img src={data[4].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[4].name}</p>
            <p>${data[4].price}</p>
          </div>
          <div>
            <img src={data[5].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[5].name}</p>
            <p>${data[5].price}</p>
          </div>
          <div>
            <img src={data[6].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[6].name}</p>
            <p>${data[6].price}</p>
          </div>
          <div>
            <img src={data[7].products[0]} alt='recommanded product' className={productDetailStyles['recommand-image']}/>
            <p>{data[7].name}</p>
            <p>${data[7].price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}