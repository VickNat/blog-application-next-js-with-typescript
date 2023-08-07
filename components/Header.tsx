import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>WebDev</span> News
      </h1>
      <p className={headerStyles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, animi delectus.</p>
    </div>
  )
}

export default Header