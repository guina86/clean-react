import React from 'react'
import Styles from './styles.scss'

export type Props = {
  date: Date
  className?: string
}

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={[Styles.calendarWrap, className].join(' ')}>
      <span role="date-day" className={Styles.day}>{date.getDate().toString().padStart(2, '0')}</span>
      <span role="date-month" className={Styles.month}>{date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}</span>
      <span role="date-year" className={Styles.year}>{date.getFullYear()}</span>
    </time>
  )
}

export default Calendar
