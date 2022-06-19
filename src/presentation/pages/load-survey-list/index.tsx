import { Footer, Logo } from '@presentation/components'
import React from 'react'
import Styles from './styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Leandro</span>
            <a href="#">sair</a>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          {[...Array(7)].map((_, i) => (
            <li key={i}>
            <div className={Styles.surveyContent}>
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
