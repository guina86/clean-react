import { Footer, Header, Icon, IconName } from '@presentation/components'
import React from 'react'
import Styles from './styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          {[...Array(7)].map((_, i) => (
            <li key={i}>
            <div className={Styles.surveyContent}>
              <Icon iconName={IconName.thumbUp} className={Styles.iconWrap}/>
              <time>
                <span className={Styles.day}>{i + 1}</span>
                <span className={Styles.month}>6</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          ))
          }

        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
