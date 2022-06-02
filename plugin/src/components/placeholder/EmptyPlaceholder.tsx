import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { SharedStyles } from '../../utils/sharedStyles'

interface Props {
  title: string
  suggestion: string
}

export function EmptyPlaceholder(props: Props) {
  return (
    <button
      className="rounded-[10px] text-grey-medium h-[200px] flex items-center justify-center text-[14px] flex-col border border-grey-light p-[25px] text-center flex-grow"
      style={SharedStyles.containerBoxShadow}
    >
      <FontAwesomeIcon
        icon={faInfoCircle}
        className="mb-[10px] text-[16px] text-[#42D3FC]"
      />
      <p className="mb-[5px]">{props.title}</p>
      <p className="text-[12px] rounded-[5px]">{props.suggestion}</p>
    </button>
  )
}
