import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import React from 'react'
import { Block } from '../../utils/types'

interface Props extends Pick<Block, 'backgroundColor' | 'title'> {
  isHighlighted?: boolean
  isLoading?: boolean
  onClick?: () => void
}

export function BlockButton(props: Props) {
  return (
    <button
      className={clsx(
        'px-[10px] py-[5px] text-[12px] mb-[3px] flex-grow rounded-[5px] w-full text-left transition-opacity flex justify-between items-center',
        props.isHighlighted
          ? 'font-bold opacity-100'
          : 'opacity-50 hover:opacity-75',
      )}
      style={{
        backgroundColor: props.backgroundColor,
      }}
      onClick={props.onClick}
    >
      <span>{props.title}</span>
      {props.isLoading && (
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-[16px] animate-spin"
        />
      )}
    </button>
  )
}
