import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { Sidebar } from '../components/sidebar/index'
import { EmptyPlaceholder } from '../components/placeholder/EmptyPlaceholder'

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>

export const sidebar = () => (
  <div className="flex justify-end">
    <Sidebar.Container>
      <Sidebar.Section
        title="Saved Blocks"
        titleCount={20}
        subtitle="Some Subtitle Goes Here"
      >
        <EmptyPlaceholder
          title="No Saved Blocks Yet"
          suggestion="Right click on a generated block to save it."
        />
      </Sidebar.Section>
      <Sidebar.Section
        title="Generated Blocks"
        titleCount={40}
        subtitle="Some Subtitle Goes Here"
      >
        <EmptyPlaceholder
          title="No Generated Blocks Yet"
          suggestion="Navigate through days where you have existing events to generate blocks."
        />
      </Sidebar.Section>
      <Sidebar.Toggle />
    </Sidebar.Container>
  </div>
)
