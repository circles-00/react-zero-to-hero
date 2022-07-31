import blankCertificate from '../assets/img/blank_certificate.png'
import Title from '../components/pages/certification/title'

const CertificationPage = () => {
  return (
    <section className="container-lg certification-container d-flex justify-content-center flex-column text-center">
      <Title />
      <img
        style={{ marginLeft: '32%', marginTop: '30px' }}
        width="450px"
        height="300px"
        src={blankCertificate}
        alt="blank_certificate"
      />
      <h5>
        <strong>
          Note: You must wait for two weeks before taking another <br /> shot at
          certification for every failed attempt.
        </strong>
      </h5>
      <button
        onClick={() => {
          console.log('clicked')
        }}
      >
        BEGIN CERTIFICATION
      </button>
    </section>
  )
}

export default CertificationPage
