import footerBannerStyles from './FooterBanner.module.css'
import headphonesa1 from '../../assets/headphones_a_1.webp'
export default function FooterBanner() {
  return (
    <div className={footerBannerStyles['footer-banner']}>
      <img src={headphonesa1} alt='headphones' className={footerBannerStyles.headphones}/>
      <div className={footerBannerStyles['container-1']}>
        <p>20% OFF</p>
        <p>FINE</p>
        <p>SMILE</p>
        <p>15 Nov TO 2 Dec</p>
      </div>
      <div className={footerBannerStyles['container-2']}>
        <p>Beats Solo Air</p>
        <p>Summer Sale</p>
        <p>Best headphones on the market</p>
      </div>
    </div>
  )
}