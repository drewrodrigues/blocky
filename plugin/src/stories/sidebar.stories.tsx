import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { Sidebar } from '../components/sidebar/index'

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
      ></Sidebar.Section>
      <Sidebar.Section
        title="Generated Blocks"
        subtitle="Some Subtitle Goes Here"
      ></Sidebar.Section>
      <Sidebar.Toggle />
    </Sidebar.Container>
  </div>
)
