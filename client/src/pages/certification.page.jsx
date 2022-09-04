import blankCertificate from '../assets/img/blank_certificate.png'
import Title from '../components/pages/certification/title'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  beginCertification,
  getCertificationData,
} from '../store/certification/actions'
import { useHistory } from 'react-router'

const CertificationPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    certification: { certificationData },
  } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getCertificationData())
  }, [])

  const onSubmitHandle = () => {
    if (
      certificationData?.certificate !== '' &&
      certificationData?.isDone === true
    ) {
      const a = document.createElement('a')
      a.href = certificationData?.certificate
      a.download = 'react-zero-to-hero.certificate.png' //File name Here
      a.click()
      return
    }
    dispatch(beginCertification(history))
  }

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
        disabled={
          certificationData?.certificate === '' &&
          certificationData?.isDone === true
        }
        onClick={onSubmitHandle}
      >
        {certificationData?.certificate === undefined
          ? 'BEGIN CERTIFICATION'
          : certificationData?.certificate !== '' &&
            certificationData?.isDone === true
          ? 'DOWNLOAD CERTIFICATE'
          : certificationData?.certificate === '' &&
            certificationData?.isDone === true
          ? 'CERTIFICATION FAILED'
          : 'CONTINUE CERTIFICATION'}
      </button>
    </section>
  )
}

export default CertificationPage
