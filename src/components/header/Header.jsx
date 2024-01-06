import headerStyles from './Header.module.css'
import headphones from '../../assets/headphones_b_4.webp'

export default function Header () {
  return(
    <div className={headerStyles['header-container']}>
      <div>
        <p>Beats solo</p>
        <p>wireless</p>
        <p>headphone</p>
        <button>Shop wireless headphone</button>
      </div>
      <div>
        <img src={headphones} alt='headphones'/>
        <p>Description</p>
        <p>The game begins here. With Immortal 1000D gaming headphones, don’t just play the game - feel it, live it, and own it. Level up your audio game with 7.1 Channel.</p>
      </div>
    </div>
  )
}