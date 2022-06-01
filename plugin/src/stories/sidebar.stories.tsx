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
    <Sidebar generatedBlocks={[]} savedBlocks={[]} />
  </div>
)

export const withBlocks = () => (
  <div className="flex justify-end">
    <Sidebar savedBlocks={SAVED_BLOCKS_FIXTURE} generatedBlocks={[]} />
  </div>
)

const SAVED_BLOCKS_FIXTURE: Block[] = [
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
  { title: '💻 Microsoft', backgroundColor: '#13B3C6', calendar: '' },
]
