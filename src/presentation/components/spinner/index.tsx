import Styles from './styles.scss'
import React from 'react'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? Styles.negative : ''
  return (
    <div role="progressbar" className={[Styles.spinner, props.className, negativeClass].join(' ')}>
      <div /><div /><div /><div />
    </div>
  )
}

export default Spinner
