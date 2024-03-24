export default function Error({inputText, textStyle}) {

  return(
    <p className={textStyle}>Your {inputText} is incomplete</p>
  )
}