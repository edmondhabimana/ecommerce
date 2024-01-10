import footerStyles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return(
    <div className={footerStyles['footer-container']}>
      <p>©2023 Gadgets Galore All Rights Reserved</p>
      <div>
      <FontAwesomeIcon icon={faInstagram} className={footerStyles.icons}/>
      <FontAwesomeIcon icon={faFacebook} className={footerStyles.icons}/>
      </div>
    </div>
  )
}