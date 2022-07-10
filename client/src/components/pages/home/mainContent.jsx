import BigLogo from '../../../assets/img/big-logo.png'

const MainContent = () => {
  return (
    <section className="main-content d-flex flex-row">
      <img
        className="main-content-img"
        src={BigLogo}
        alt=""
        width="444"
        height="444"
      />
      <div className="flex-column justify-content-between main-content-text-container">
        <h1 className="main-content-heading text-main-color">BRAND NAME</h1>
        <h1 className="main-content-heading text-color-white">
          LEARN REACT FROM THE BEST TODAY!
        </h1>
        <p className="main-content-paragraph text-color-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Potenti
          sagittis sit a et ante semper nibh tellus. Nibh viverra sollicitudin
          feugiat arcu, varius elit rhoncus commodo eget.{' '}
        </p>
      </div>
    </section>
  )
}

export default MainContent
