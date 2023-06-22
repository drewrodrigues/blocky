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
    <div
      className="rounded-[10px] text-grey-medium h-[200px] flex items-start justify-center text-[14px] flex-col border border-grey-light p-[25px] flex-grow pointer-events-none"
      style={SharedStyles.containerBoxShadow}
    >
      <header className="flex items-center mb-[10px]">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="text-[16px] text-[#42D3FC] mr-[7.5px]"
        />
        <p className="font-bold text-[12px] leading-[1]">{props.title}</p>
      </header>
      <p className="text-[12px] rounded-[5px]">{props.suggestion}</p>
    </div>
  )
}
