import smallerImagesStyles from './SmallerImages.module.css'

export default function SmallerImages({productImage, index, displayImage }) {
  return(
    <>
      <img 
        src={productImage} 
        alt='Stereo' 
        className={smallerImagesStyles['smaller-images']} 
        onMouseEnter={() => displayImage(index)}
      />
    </>
  )
}