import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { Sidebar } from '../components/sidebar/index'

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>

export const sidebar = () => (
  <Sidebar.Container>
    <Sidebar.Section title="Section Title"></Sidebar.Section>
    <Sidebar.Section title="Section Title"></Sidebar.Section>
    <Sidebar.Toggle />
  </Sidebar.Container>
)
