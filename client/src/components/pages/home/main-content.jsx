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
        <h1 className="main-content-heading text-main-color">
          REACT ZERO TO HERO
        </h1>
        <h1 className="main-content-heading text-color-white">
          LEARN REACT FROM THE BEST TODAY!
        </h1>
        <p className="main-content-paragraph text-color-white">
          Get access to numerous courses and learn from the best, today! <br />
          Get your own certificate for finishing the React course and open new
          opportunities for yourself
        </p>
      </div>
    </section>
  )
}

export default MainContent
