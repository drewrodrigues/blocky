import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { Sidebar, _Sidebar } from '../components/sidebar/index'
import { Block } from '../utils/types'

export default {
  title: 'Sidebar',
  component: _Sidebar,
} as ComponentMeta<typeof _Sidebar>

export const emptyStates = () => (
  <div className="flex justify-end">
    <Sidebar
      generatedBlocks={[]}
      savedBlocks={[]}
      onCloseSidebar={() => null}
    />
  </div>
)

export const withSavedBlocks = () => (
  <div className="flex justify-end">
    <Sidebar
      savedBlocks={SAVED_BLOCKS_FIXTURE}
      generatedBlocks={[]}
      onCloseSidebar={() => null}
    />
  </div>
)

export const withBothBlocks = () => (
  <div className="flex justify-end">
    <Sidebar
      savedBlocks={SAVED_BLOCKS_FIXTURE}
      generatedBlocks={SAVED_BLOCKS_FIXTURE}
      onCloseSidebar={() => null}
    />
  </div>
)

const BLOCK_FIXTURE = {
  title: '💻 Microsoft',
  backgroundColor: '#13B3C6',
  calendar: '',
}

const SAVED_BLOCKS_FIXTURE: Block[] = [
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
  BLOCK_FIXTURE,
]
