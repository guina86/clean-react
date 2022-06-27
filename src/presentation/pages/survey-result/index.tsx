import React from 'react'
import Styles from './styles.scss'
import { Calendar, Footer, Header, Loading } from '@presentation/components'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        {true &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Se você pudesse desenvolver um framework javascript, programção você utilizaria?</h2>
            </hgroup>
            <ul>
              <li>
                <img src="https://guina-node-api.herokuapp.com/static/img/logo-react.png" alt="" />
                <span className={Styles.answer}>resposta 1</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="https://guina-node-api.herokuapp.com/static/img/logo-angular.png" alt="" />
                <span className={Styles.answer}>resposta 2</span>
                <span className={Styles.percent}>20%</span>
              </li>
              <li>
                <img src="https://guina-node-api.herokuapp.com/static/img/logo-flutter.png" alt="" />
                <span className={Styles.answer}>resposta 3</span>
                <span className={Styles.percent}>30%</span>
              </li>
            </ul>
            <button>Voltar</button>
          </>
        }
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
